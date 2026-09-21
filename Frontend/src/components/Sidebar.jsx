import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/apiClient";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      localStorage.clear("token")
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-slate-800 p-5 flex flex-col gap-2">
      <h2 className="text-xl font-bold text-white mb-5">
        Student Management System
      </h2>

      <Link to="/dashboard" className="text-white px-4 py-3 rounded hover:bg-slate-700">
        Dashboard
      </Link>
      <Link
        to="/studentPage"
        className="text-white px-4 py-3 rounded hover:bg-slate-700"
      >
        Student
      </Link>
      <Link
        to="/teacherPage"
        className="text-white px-4 py-3 rounded hover:bg-slate-700"
      >
        Teacher
      </Link>
      <Link
        to="/coursePage"
        className="text-white px-4 py-3 rounded hover:bg-slate-700"
      >
        Course
      </Link>

      <button
        onClick={handleLogout}
        className="text-left text-white px-4 py-3 rounded hover:bg-slate-700 w-full mt-auto"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
