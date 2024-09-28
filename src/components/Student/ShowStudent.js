import React, { useEffect, useState } from 'react';
import { getAllStudents } from '../../services/services';
import Loader from '../utils/Loader';
import ConfirmationModal from '../utils/ConfirmationModal';
import EditStudentModal from './EditStudentModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShowStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        setStudents(response); // Adjust based on actual API response structure
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Error fetching students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const student = students.find(s => s.id === id);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedStudent) {
      console.log(`Delete student with id ${selectedStudent.id}`);
      // Perform the delete operation here
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleUpdate = () => {
    setIsEditModalOpen(false);
    // Fetch students again to refresh the list
    // fetchStudents();
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Container sx={{ marginTop: '10px' }}>
      <TableContainer component={Paper} sx={{ width: '80%', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.studentRollNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.class.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        studentName={selectedStudent ? selectedStudent.name : ''}
      />

      {selectedStudent && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          studentData={selectedStudent}
          onUpdate={handleUpdate}
        />
      )}
    </Container>
  );
};

export default ShowStudent;
