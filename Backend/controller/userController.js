import User from "../model/User.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json("all field is required");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json("user already exists");
    }
    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    console.log(hashPassword);

    await newUser.save();
    res.json({ success: true, message: "user register successfully", newUser });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check field
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = generateToken(user, process.env.secret_key, "7d");
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from reading the cookie (protects against XSS)
      secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
      sameSite: "lax", // Protects against CSRF attacks while allowing normal navigation links
      maxAge: 15 * 60 * 1000, // Best practice: explicit expiration matching your token lifetime (e.g., 15 mins)
    });

    // Login Successful
    res.json({
      success: true,
      message: "Login Successful",
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const logout = (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
             sameSite: "lax",
        });
        res.json({
            success:true,
            message:"Logout Successful"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}