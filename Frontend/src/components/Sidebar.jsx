import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-800 p-5 flex flex-col gap-2">

      <h2 className="text-xl font-bold text-white mb-5">
        Student Management System
      </h2>

      <Link
        to="/"
        className="text-white px-4 py-3 rounded hover:bg-slate-700"
      >
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

    </div>
  )
}

export default Sidebar;