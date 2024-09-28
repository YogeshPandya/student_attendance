import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql';
// const API_URL = 'https://ee53-122-168-138-103.ngrok-free.app/graphql';

// Function to create a student
export const createStudent = async (studentData) => {
  const query = `
    mutation CreateStudent($createStudentInput: CreateStudentInput!) {
      createStudent(createStudentInput: $createStudentInput) {
        id
        name
        age
        classId
        email
      }
    }
  `;
  const variables = {
    createStudentInput: {
      name: studentData.name,
      age: parseInt(studentData.age, 10),  // Ensure age is an integer
      classId: parseInt(studentData.classId, 10),
      email: studentData.email
    }
  };

  try {
    const response = await axios.post(API_URL, {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.data.createStudent;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

// Function to get a student by ID
export const getStudentById = async (id) => {
  const query = `
    query GetStudent($id: Int!) {
      student(id: $id) {
        id
        name
        age
        class
        email
      }
    }
  `;
  const variables = { id };

  try {
    const response = await axios.post(API_URL, {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.data.student;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

// Function to get all students
export const getAllStudents = async () => {
  const query = `
  query GetStudents {
    students {
      id
      name
      age
      email
      year
      studentRollNo
      class {
        id
        name
        description
      }
    }
  }
`;
  try {
    const response = await axios.post(API_URL, {
      query,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.data.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Function to get all students
export const getStudentsWithFilters = async (filter) => {
  // Construct the GraphQL query string dynamically
  const query = `
    query {
      studentsWithFilters(filter: { classId: ${filter.className || 0}, year: ${filter.year || 0} }) {
        studentRollNo
        name
      }
    }
  `;

  try {
    const response = await axios.post(API_URL, {
      query,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.data.studentsWithFilters;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Function to get all students
export const getAllClasses = async () => {
  const query = `
    query { getAllClasses { id name } }
  `;

  try {
    const response = await axios.post(API_URL, {
      query,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.data.getAllClasses;
  } catch (error) {
    console.error('Error fetching getAllClasses:', error);
    throw error;
  }
};