import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Student from './components/Student';
import Class from './components/Class';
import Teacher from './components/Teacher';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/class" element={<Class />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
