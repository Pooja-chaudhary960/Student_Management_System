import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const StudentForm = () => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    gender: "",
    teachers: [],
    courses: [],
  };

  const getTeachers = async () => {
    try {
      const response = await apiClient.get("/getTeachers");
      setTeachers(response.data.teachers);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await apiClient.get("/getCourse");
      setCourses(response.data.courses);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getTeachers();
    getCourses();
    if (id) {
      fetchStudentById(id);
    }
  }, [id]);

  const fetchStudentById = async (id) => {
    try {
      setLoading(true);

      const response = await apiClient.get(
        `/getStudent/${id}`,
      );

      console.log(response.data);

      const studentData = response.data.student;

      setStudents(studentData);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      if (id) {
        await apiClient.put(
          `/updateStudent/${id}`,
          values,
        );
      } else {
        await apiClient.post("/students", values);
      }

      navigate("/studentPage");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save student");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? "Edit Student" : "Add Student"}
      </h1>

      <Formik
        initialValues={students || initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <Field
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-full border p-2 rounded"
            />

            <Field
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border p-2 rounded"
            />

            <Field
              type="text"
              name="address"
              placeholder="Enter Address"
              className="w-full border p-2 rounded"
            />

            <Field
              type="text"
              name="phoneNo"
              placeholder="Enter Phone Number"
              className="w-full border p-2 rounded"
            />

            <Field
              as="select"
              name="gender"
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Field>

            <div className="md:col-span-2">
              <select
                name="teachers"
                value={values.teachers?.[0] || ""}
                onChange={(e) => {
                  setFieldValue(
                    "teachers",
                    e.target.value ? [e.target.value] : [],
                  );
                }}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
              >
                <option value="">Select Teacher</option>

                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                name="courses"
                value={values.courses?.[0] || ""}
                onChange={(e) => {
                  setFieldValue(
                    "courses",
                    e.target.value ? [e.target.value] : [],
                  );
                }}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate("/teacherPage")}
                className="w-1/2 px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
              >
                {isEditMode ? "Edit Student" : "Add Student"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentForm;
