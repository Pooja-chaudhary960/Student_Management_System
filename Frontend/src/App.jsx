import './App.css';
import MainLayout from './components/MainLayout';
import { Route, Routes } from 'react-router-dom';
import StudentPage from './pages/StudentPage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CoursePage from './pages/CoursePage.jsx';
import StudentForm from './components/StudentForm.jsx';
import CourseForm from './components/CourseForm.jsx';
import TeacherForm from './components/TeacherForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';

function App() {
  return (
    <>
      <Routes>

        {/* Login and Register - WITHOUT Sidebar */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Main Layout - WITH Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/studentPage" element={<StudentPage />} />
          <Route path="/teacherPage" element={<TeacherPage />} />
          <Route path="/coursePage" element={<CoursePage />} />

          <Route path="/addStudent" element={<StudentForm />} />
          <Route path="/addCourse" element={<CourseForm />} />
          <Route path="/addTeacher" element={<TeacherForm />} />

          <Route path="/editStudent/:id" element={<StudentForm />} />
          <Route path="/editTeacher/:id" element={<TeacherForm />} />
          <Route path="/editCourse/:id" element={<CourseForm />} />
        </Route>

      </Routes>
    </>
  )
}

export default App;