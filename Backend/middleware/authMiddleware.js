import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Not Authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    console.log("User:", decoded);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default protect;