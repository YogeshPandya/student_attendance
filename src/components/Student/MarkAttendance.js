import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Select, MenuItem, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Loader from '../utils/Loader';
import { getAllClasses, getStudentsWithFilters } from '../../services/services';
import './Student.css';
import Login from '../Auth/login';

const MarkAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentsApiCall, setStudentsApiCall] = useState(false);
  const [filters, setFilters] = useState({ year: '', className: '' });
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
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

  // Simulate loading effect
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setError('');  // Clear error when user starts interacting
  };

  const handleAttendanceChange = (studentId, value) => {
    setAttendance({
      ...attendance,
      [studentId]: value,
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    if (selectedDate > today) {
      setError('Future dates cannot be selected.');
    } else {
      setDate(e.target.value);
      setError('');
    }
  };

  const handleApplyFilters = async () => {
    if (!filters.year || !filters.className) {
      setError('Please select both year and class.');
      return;
    }

    setError('');

    try {
      setStudentsApiCall(true);
      const fetchedStudents = await getStudentsWithFilters(filters);
      setStudents(fetchedStudents);
    } catch (error) {
      setError('Error fetching students.');
    }
  };

  const handleClearFilters = () => {
    setStudentsApiCall(false);
    setFilters({ year: '', className: '' });
    setStudents([]);
    setAttendance({});
    setDate('');
    setError('');
  };

  const handleSubmitAttendance = async () => {
    handleClickOpen();
  };

  const handleCancel = async () => {

  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Loader />;

  return (
    <>
    <Login open={open} handleClose={handleClose} />

    <Container>
      <Box my={4}>
        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
          Mark Attendance
        </Typography>

        {/* Filter Section */}
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} my={2}>
          <Select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            displayEmpty
            size="small" // Adjust size to small
            sx={{ minWidth: 170 }} // Minimum width
          >
            <MenuItem value="">Select Year</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>

          <Select
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            displayEmpty
            size="small" // Adjust size to small
            sx={{ minWidth: 170 }} // Minimum width
          >
            <MenuItem value="">
              <em>Select Class</em>
            </MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="primary" onClick={handleApplyFilters} sx={{ minWidth: 150 }}>
            Apply
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/* Student List Section */}
        {students.length > 0 ? (
          <Box my={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Roll No</strong></TableCell>
                    <TableCell align="center"><strong>Student Name</strong></TableCell>
                    <TableCell align="center"><strong>Attendance</strong></TableCell>
                    <TableCell align="center"><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell align="center">{student.studentRollNo}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">
                        <Select
                          value={attendance[student.id] || ''}
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          displayEmpty
                          size="small"
                          sx={{ minWidth: 150 }} // Fixed minimum width
                        >
                          <MenuItem value="">Mark Attendance</MenuItem>
                          <MenuItem value="present">Present</MenuItem>
                          <MenuItem value="absent">Absent</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="date"
                          value={date}
                          onChange={handleDateChange}
                          InputProps={{ inputProps: { max: new Date().toISOString().split("T")[0] } }} // Disable future dates
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Submit and Cancel Buttons */}
            <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button variant="contained" color="primary" onClick={handleSubmitAttendance}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          studentsApiCall && (
            <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
              No Student Found...
            </Typography>
          )
        )}
      </Box>
    </Container>
    </>
  );
};

export default MarkAttendance;
