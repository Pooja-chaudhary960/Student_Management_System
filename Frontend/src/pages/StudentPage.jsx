import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const handleAddStudent = () => {
    navigate("/addStudent");
  };

  const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getStudent");

      console.log(response.data);

      setStudents(response.data.students);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?",
      );

      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:4000/api/deleteStudent/${id}`);

      setStudents(students.filter((student) => student._id !== id));

      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to delete student");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Page</h1>

        <button
          onClick={handleAddStudent}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>

              <th className="border border-gray-300 px-4 py-2">Email</th>

              <th className="border border-gray-300 px-4 py-2">Address</th>

              <th className="border border-gray-300 px-4 py-2">Phone</th>

              <th className="border border-gray-300 px-4 py-2">Gender</th>

              <th className="border border-gray-300 px-4 py-2">Teacher</th>

              <th className="border border-gray-300 px-4 py-2">Course</th>

              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.email}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.address}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.phoneNo}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.gender}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.teachers && student.teachers.length > 0
                    ? student.teachers.map((teacher) => teacher.name).join(", ")
                    : "No Teacher"}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {student.courses && student.courses.length > 0
                    ? student.courses.map((course) => course.name).join(", ")
                    : "No Course"}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${student._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
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

export default StudentPage;
