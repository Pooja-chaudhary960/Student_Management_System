import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useGetApiHooks } from "../hooks/getApiHooks";

const Dashboard = () => {
  const [student] = useGetApiHooks("/getStudent");
  const [teacher] = useGetApiHooks("/getTeachers");
  const [course] = useGetApiHooks("/getCourse");


  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome to Student Management System
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students */}
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Students
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-2">
                {student?.students?.length}
              </h2>

              <p className="text-blue-500 text-sm mt-2">Registered Students</p>
            </div>

            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              👨‍🎓
            </div>
          </div>
        </div>

        {/* Teachers */}
         <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Teachers
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-2">
                {teacher?.teachers?.length}
              </h2>

              <p className="text-green-500 text-sm mt-2">Registered Teachers</p>
            </div>

            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              👨‍🏫
            </div>
          </div>
        </div> 

        {/* Courses */}
         <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Courses
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-2">
                {course?.courses?.length}
              </h2>

              <p className="text-purple-500 text-sm mt-2">Available Courses</p>
            </div>

            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              📚
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
