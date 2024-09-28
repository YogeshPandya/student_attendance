import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Login from '../Auth/login';

const DashboardNavbar = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="relative">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit', // Change color if active
              marginRight: '16px' // Add space between buttons
            })}
          >
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink
            to="/student"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit',
              marginRight: '16px'
            })}
          >
            <Button color="inherit">Student</Button>
          </NavLink>
          <NavLink
            to="/class"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit',
              marginRight: '16px'
            })}
          >
            <Button color="inherit">Class</Button>
          </NavLink>
          <NavLink
            to="/teacher"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit',
              marginRight: '16px'
            })}
          >
            <Button color="inherit">Teacher</Button>
          </NavLink>
          <NavLink
            to="/about-us"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit',
              marginRight: '16px'
            })}
          >
            <Button color="inherit">About Us</Button>
          </NavLink>
          <NavLink
            to="/contact-us"
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'black' : 'inherit',
              marginRight: '16px'
            })}
          >
            <Button color="inherit">Contact Us</Button>
          </NavLink>
        </div>
        <div>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <Button color="inherit" onClick={handleClickOpen}>
            Log in
          </Button>
          <Login open={open} handleClose={handleClose} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
