import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const CoursePage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const handleAddCourse = () => {
    navigate("/addCourse");
  };

  const getCourses = async () => {
    try {
      const response = await apiClient.get("/getCourse");

      console.log(response.data);

      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?",
      );

      if (!confirmDelete) {
        return;
      }

      await apiClient.delete(`/deleteCourse/${id}`);

      setCourses(courses.filter((course) => course._id !== id));

      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow-sm border border-slate-200">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Course Page
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage all courses
          </p>
        </div>

        <button
          onClick={handleAddCourse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          + Add Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Code
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Fee
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {courses.map((course) => (

                <tr
                  key={course._id}
                  className="border-b border-slate-200 hover:bg-blue-50 transition-colors duration-150"
                >

                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                    {course.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.code}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.duration}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {course.fee}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/editCourse/${course._id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default CoursePage;