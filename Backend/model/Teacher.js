import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  address: {
    type: "String",
  },
  phoneNo: {
    type: "String",
  },
  qualification: {
    type: "String"
  },
   courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
