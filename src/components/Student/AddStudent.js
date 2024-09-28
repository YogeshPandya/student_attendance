import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { createStudent, getAllClasses } from '../../services/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [classes, setClasses] = useState([]);
  const [studentData, setStudentData] = useState({
    name: '',
    age: '',
    classId: '', // Changed from 'class' to 'classId'
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await getAllClasses();
        setClasses(response);
      } catch (err) {
        console.error('Error fetching getAllClasses:', err);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let valid = true;
    const newErrors = {};

    if (!studentData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!studentData.age || isNaN(studentData.age) || studentData.age < 0) {
      newErrors.age = 'Valid, non-negative age is required';
      valid = false;
    }
    if (!studentData.classId) {
      newErrors.classId = 'Class is required';
      valid = false;
    }
    if (!studentData.email || !/\S+@\S+\.\S+/.test(studentData.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      await createStudent(studentData);
      toast.success('Student added successfully!');
      setStudentData({ name: '', age: '', classId: '', email: '' });
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  return (
    <Container
      maxWidth="sm" // Set maximum width (e.g., small)
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mt: 4 // Margin top
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5" component="h2">Enter Student Details</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={studentData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.age)}
            helperText={errors.age}
            inputProps={{ min: 1 }} // Prevent negative numbers
          />
          <FormControl fullWidth margin="normal" error={Boolean(errors.classId)}>
            <InputLabel>Class</InputLabel>
            <Select
              label="Class"
              name="classId"
              value={studentData.classId}
              onChange={handleChange}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
            {errors.classId && <Typography color="error">{errors.classId}</Typography>}
          </FormControl>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={studentData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Student
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Container>
  );
};

export default AddStudent;
