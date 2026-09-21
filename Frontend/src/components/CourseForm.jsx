
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const CourseForm = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    code: "",
    duration: "",
    fee: "",
  };

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
  }, [id]);

  const fetchCourseById = async (id) => {
    try {
      setLoading(true);

      const response = await apiClient.get(
        `/getCourse/${id}`
      );

      console.log(response.data);

      const courseData = response.data.course;

      setCourse(courseData);
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
          `/updateCourse/${id}`,
          values
        );
      } else {
        await apiClient.post(
          "/course",
          values
        );
      }

      navigate("/coursePage");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save course");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            {isEditMode ? "Edit Course" : "Add New Course"}
          </h1>

          <p className="text-blue-100 mt-1">
            {isEditMode
              ? "Update course information"
              : "Enter the details of the new course"}
          </p>
        </div>

        <div className="p-8">

          <Formik
            initialValues={course || initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Name
                </label>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter course name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500 focus:bg-white
                  transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Code
                </label>

                <Field
                  type="text"
                  name="code"
                  placeholder="Enter course code"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500 focus:bg-white
                  transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>

                <Field
                  type="text"
                  name="duration"
                  placeholder="Example: 4 Years"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500 focus:bg-white
                  transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Fee
                </label>

                <Field
                  type="number"
                  name="fee"
                  placeholder="Enter course fee"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500 focus:bg-white
                  transition duration-200"
                />
              </div>

              <div className="flex gap-4 pt-4">

                <button
                  type="button"
                  onClick={() => navigate("/coursePage")}
                  className="w-1/2 border border-gray-300 bg-white text-gray-700
                  font-semibold py-3 rounded-lg
                  hover:bg-gray-100 hover:border-gray-400
                  transition duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700
                  text-white font-semibold py-3 rounded-lg
                  shadow-md hover:shadow-lg
                  transition duration-200"
                >
                  {isEditMode ? "Update Course" : "Add Course"}
                </button>

              </div>

            </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default CourseForm;
