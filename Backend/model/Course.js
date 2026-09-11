import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  code: {
    type: "String",
    required: true,
    unique: true,
  },
  duration:{
    type:"String"
  },
  fee:{
    type:"Number",
    required:true
  },
});

const Course = mongoose.model("Course", courseSchema)

export default Course;