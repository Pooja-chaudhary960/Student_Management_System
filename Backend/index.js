import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
const port = 4000;

//Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use("/api",studentRoutes)
app.use("/api",teacherRoutes)
app.use("/api",courseRoutes)



//Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
