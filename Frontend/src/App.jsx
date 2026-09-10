import './App.css';
import MainLayout from './components/MainLayout';
import { Route, Routes } from 'react-router-dom';
import StudentPage from './pages/StudentPage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CoursePage from './pages/CoursePage.jsx';
import StudentForm from './components/StudentForm.jsx';

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
        </Route>
      </Routes>
    </>
  )
}

export default App;