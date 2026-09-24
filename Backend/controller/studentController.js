import Student from "../model/Student.js";

export const createStudent = async (req, res) => {
    try {
      console.log(req.body);
      
        const { name, email, gender, phoneNo, address, teachers, courses } = req.body;

        const student = await Student.create({
            name,
            email,
            gender,
            phoneNo,
            address,
            teachers,
            courses
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
};

export const getAllStudents = async (req,res)=>{
    try {
        const students = await Student.find()
        .populate("teachers")
        .populate("courses")
        res.status(200).json({
            success:true,
            message:"Successfully Retrieved Students",
            students:students
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to Retrieve Students",
            error:error.message
        })
    }

}

export const getStudentById = async (req, res) => {
  try {
    console.log(req.params.id);
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      student: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving student",
      error: error.message,
    });
  }
};

export const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student: student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message
    });
  }
};

export const updateStudentById = async(req,res) => {
  try {
    const studentId = req.params.id;
    const {name,email,phoneNo,gender,address,teachers,courses} = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      {name,email,phoneNo,gender,address,teachers,courses},
      {new: true}
    );
    if(!student){
      return res.status(404).json({
        success:false,
        message:"Student is not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Student Update Successfully",
      student:student
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Error updating student",
      error:error.message
    })
    
  }
}