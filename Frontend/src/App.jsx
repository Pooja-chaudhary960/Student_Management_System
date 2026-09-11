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

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/studentPage" element={<StudentPage />} />
          <Route path='/teacherPage' element={<TeacherPage/>}/>
          <Route path='/coursePage' element={<CoursePage />}/>
          <Route path='/addStudent' element={<StudentForm/>}/>
          <Route path='/addCourse' element={<CourseForm/>}/>
          <Route path='addTeacher' element={<TeacherForm/>}/>
          <Route path='/editStudent/:id' element={<StudentForm />} />
          <Route path='/editTeacher/:id' element={<TeacherForm/>}/>
          <Route path='/editCourse/:id' element={<CourseForm/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;