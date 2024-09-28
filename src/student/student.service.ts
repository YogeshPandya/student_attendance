import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput, GetStudentFilterInput } from './dto/student.dto';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private classService: ClassService
  ) { }

  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    try {
      // Generate unique student roll number
      const studentRollNo = await this.generateStudentRollNo(createStudentInput.classId, createStudentInput.name);
  
      // Create a new student record with the generated roll number
      const student = this.studentRepository.create({
        ...createStudentInput,
        studentRollNo,  // Set the generated roll number
      });
  
      return await this.studentRepository.save(student);
    } catch (error) {
      console.log("catch error =>", error);
      throw new HttpException('Error creating student', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      // return await this.studentRepository.find();
      return await this.studentRepository.find({ relations: ["class"] });

    } catch (error) {
      throw new HttpException('Error fetching students', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findStudentsWithFilters(
    filter: GetStudentFilterInput,
  ): Promise<Student[]> {
    try {
      const query = this.studentRepository.createQueryBuilder('student');

      if (filter.classId) {
        query.andWhere('student.classId = :classId', { classId: filter.classId });
      }

      if (filter.year) {
        query.andWhere('student.year = :year', { year: filter.year });
      }

      return await query.getMany();
    } catch (error) {
      throw new HttpException('Error fetching students', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateStudentRollNo(classId: number, studentName: string): Promise<string> {
    let studentRollNo = '';
    let isUnique = false;
  
    // Fetch class name based on classId
    const className = await this.classService.getClassesById(classId);
  
    // Extract number part from the class name and pad it
    const numberPart = className.name.match(/\d+/);
    const classNumber = numberPart ? numberPart[0].padStart(2, '0') : '';
  
    // Get initials from the student's name
    const nameParts = studentName.split(' ');
    let name;
    if (nameParts.length === 1) {
      name = nameParts[0][0].toLowerCase() + '0';  // If no last name, append '0'
    } else {
      name = nameParts[0][0].toLowerCase() + nameParts[1][0].toLowerCase();
    }
  
    // Loop to ensure unique roll number
    while (!isUnique) {
      const random4Digits = Math.floor(1000 + Math.random() * 9000);  // Generate 4 random digits
      studentRollNo = `AP${classNumber}${name}${random4Digits}`;
  
      // Check if roll number is unique
      const existingStudent = await this.studentRepository.findOne({
        where: { studentRollNo },
      });
  
      if (!existingStudent) {
        isUnique = true;  // Roll number is unique
      }
    }
  
    return studentRollNo;
  }
}
