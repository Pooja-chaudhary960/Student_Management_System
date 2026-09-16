import User from "../model/User.js";
import bcryptjs from "bcryptjs";

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
    res.json({success:true, message:'user register successfully', newUser})
  } catch (error) {
    console.log(error)
  }
};

export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        //check field
        if(!email || !password)
        {
            return res.json({
                success:false,
                message:"All fields are required"
            });
        }

        //find user by email
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            });
        }

        // compare password
        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid Password"
            });
        }

        // Login Successful
        res.json({
            success:true,
            message:"Login Successful",
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}





