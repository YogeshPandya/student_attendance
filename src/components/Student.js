import React from 'react';
import { Typography, Box } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import StudentNavbar from './Navbar/StudentNavbar';
import DashboardNavbar from './Navbar/DashboardNavbar';
import AddStudent from './Student/AddStudent';
import ShowStudent from './Student/ShowStudent';
import MarkAttendance from './Student/MarkAttendance';
import './css/Student.css';

const Student = () => {
  return (
    <Box>
      <DashboardNavbar />
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Student Portal
        </Typography>
        <StudentNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="mark-attendance" />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="add" element={<AddStudent />} />
          <Route path="show" element={<ShowStudent />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Student;
