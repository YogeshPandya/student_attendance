import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllClasses } from '../../services/services';

const EditStudentModal = ({ isOpen, onClose, studentData, onUpdate }) => {
  const [formData, setFormData] = useState(studentData);
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState([]);

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

  useEffect(() => {
    setFormData(studentData);
  }, [studentData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.age || formData.age < 1) newErrors.age = "Please enter a valid age.";
    // if (!formData.class.trim()) newErrors.class = "Class is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // const response = await updateStudent(formData);
        // console.log('Student updated:', response);
        setErrors({});
        onUpdate();  // Notify parent component of the update
        onClose();   // Close the modal
        toast.success('Student updated successfully!');
      } catch (error) {
        console.error('Error updating student:', error);
        toast.error('Error updating student. Please try again.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
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
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.age)}
            helperText={errors.age}
            inputProps={{ min: 0 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Class</InputLabel>
            <Select
             label="Class"
             name="class"
             value={formData.class}
             onChange={handleChange}
             fullWidth
             margin="normal"
             error={Boolean(errors.class)}
             helperText={errors.class}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={handleSubmit} color="primary">Update Student</Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default EditStudentModal;
