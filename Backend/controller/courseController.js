import Course from "../model/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { name, code, duration, fee } = req.body;

    const course = await Course.create({
      name,
      code,
      duration,
      fee,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      message: "Courses Retrieved Successfully ",
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieved course",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course Retrieved Successfully",
      course: course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Retrieved Course",
      error: error.message
    });
  }
};

export const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course: course
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message
    });
  }
};

export const updateCourseById =async(req,res)=>{
  try {
    const courseId = req.params.id;
    const {name,code,duration,fee} = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      {name,code,duration,fee},
      {new : true}
    );
    if(!course)
    {
      return res.status(400).json({
        success:false,
        message:"Course not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Course Update Successfully",
      course:course
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error updating Course"
    })
  }

}

