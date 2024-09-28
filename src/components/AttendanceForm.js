import React, { useState } from 'react';

const AttendanceForm = ({ students, onMarkAttendance }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [status, setStatus] = useState('Present');

  const handleSubmit = (e) => {
    e.preventDefault();
    onMarkAttendance(selectedStudent, status);
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student:
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
