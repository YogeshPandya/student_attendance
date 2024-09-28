import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StudentNavbar = () => {
  return (
    <AppBar position="static" sx={{ color: 'blue', backgroundColor: 'white' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavLink to="mark-attendance" style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'black' : 'inherit', // Apply black color if active
        })}>
          <Button color="inherit">Mark Attendance</Button>
        </NavLink>
        <NavLink to="add" style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'black' : 'inherit', // Apply black color if active
        })}>
          <Button color="inherit">Add Student</Button>
        </NavLink>
        <NavLink to="show" style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? 'black' : 'inherit', // Apply black color if active
        })}>
          <Button color="inherit">Show Student</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
