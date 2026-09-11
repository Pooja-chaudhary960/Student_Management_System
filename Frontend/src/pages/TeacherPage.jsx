import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);

  const handleAddTeacher = () => {
    navigate("/addTeacher");
  };

  const getTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/getTeachers"
      );

      console.log(response.data);

      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this teacher?"
      );

      if (!confirmDelete) {
        return;
      }

      await axios.delete(
        `http://localhost:4000/api/deleteTeacher/${id}`
      );

      setTeachers(
        teachers.filter((teacher) => teacher._id !== id)
      );

      alert("Teacher deleted successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to delete teacher");
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Teacher Page
        </h1>

        <button
          onClick={handleAddTeacher}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Add Teacher
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse border border-gray-300">

          <thead>

            <tr className="bg-gray-100">

              <th className="border border-gray-300 px-4 py-2">
                Name
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Email
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Address
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Phone
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Qualification
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Course
              </th>

              <th className="border border-gray-300 px-4 py-2">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {teachers.map((teacher) => (

              <tr
                key={teacher._id}
                className="hover:bg-gray-50"
              >

                <td className="border border-gray-300 px-4 py-2">
                  {teacher.name}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {teacher.email}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {teacher.address}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {teacher.phoneNo}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {teacher.qualification}
                </td>

                <td className="border border-gray-300 px-4 py-2">

                  {teacher.courses &&
                  teacher.courses.length > 0
                    ? teacher.courses
                        .map((course) => course.name)
                        .join(", ")
                    : "No Course"}

                </td>

                <td className="border border-gray-300 px-4 py-2">

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/editTeacher/${teacher._id}`
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(teacher._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
  );
};

export default TeacherPage;