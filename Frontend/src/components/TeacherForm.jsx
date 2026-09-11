import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TeacherForm = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    qualification: "",
    courses: [],
  };

  // Get all courses
  const getCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getCourse"
      );

      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error getting courses:", error);
    }
  };

  // Get teacher by ID
  const fetchTeacherById = async (teacherId) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:4000/api/getTeachers/${teacherId}`
      );

      console.log("Teacher API response:", response.data);

      const teacherData = response.data.teacher;

      setTeacher({
        name: teacherData.name || "",
        email: teacherData.email || "",
        address: teacherData.address || "",
        phoneNo: teacherData.phoneNo || "",
        qualification: teacherData.qualification || "",
        courses: teacherData.courses
          ? teacherData.courses.map((course) =>
              typeof course === "object"
                ? course._id
                : course
            )
          : [],
      });
    } catch (error) {
      console.error("Error getting teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();

    if (id) {
      fetchTeacherById(id);
    }
  }, [id]);

  // Submit
  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    try {
      if (id) {
        await axios.put(
          `http://localhost:4000/api/updateTeacher/${id}`,
          values
        );

        alert("Teacher updated successfully!");
      } else {
        await axios.post(
          "http://localhost:4000/api/teachers",
          values
        );

        alert("Teacher added successfully!");
      }

      navigate("/teacherPage");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save teacher");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-blue-600">
          Loading teacher...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? "Edit Teacher" : "Add New Teacher"}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-slate-200">

          <Formik
            initialValues={teacher || initialValues}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Teacher Name
                    </label>

                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter teacher name"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>

                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Address
                    </label>

                    <Field
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <Field
                      type="text"
                      name="phoneNo"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  {/* Qualification */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Qualification
                    </label>

                    <Field
                      type="text"
                      name="qualification"
                      placeholder="Example: BIT, BCA, MIT, MCA"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>

                  {/* Course */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Course
                    </label>

                    <select
                      name="courses"
                      value={values.courses?.[0] || ""}
                      onChange={(e) => {
                        setFieldValue(
                          "courses",
                          e.target.value
                            ? [e.target.value]
                            : []
                        );
                      }}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg"
                    >
                      <option value="">
                        Select Course
                      </option>

                      {courses.map((course) => (
                        <option
                          key={course._id}
                          value={course._id}
                        >
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="px-8 py-6 border-t border-slate-200 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => navigate("/teacherPage")}
                    className="px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {isEditMode
                      ? "Update Teacher"
                      : "Add Teacher"}
                  </button>

                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;