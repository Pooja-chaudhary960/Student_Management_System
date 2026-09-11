import Teacher from "../model/Teacher.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, phoneNo, address, qualification, courses } = req.body;

    const teacher = await Teacher.create({
      name,
      email,
      phoneNo,
      address,
      qualification,
      courses,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("courses")
    res.status(200).json({
      success: true,
      message: "Successfully Retrieved Teachers",
      teachers: teachers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Retrieved Teachers",
      error: error.message,
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("courses");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const teacher = await Teacher.findByIdAndDelete(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      teacher: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};

export const updateTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const {
      name,
      email,
      address,
      phoneNo,
      qualification,
      courses
    } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        name,
        email,
        address,
        phoneNo,
        qualification,
        courses,
      },
      { new: true }
    );

    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};