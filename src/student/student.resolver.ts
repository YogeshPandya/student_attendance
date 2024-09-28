import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { CreateStudentInput, GetStudentFilterInput } from './dto/student.dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Student)
  async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<Student> {
    try {
      console.log("createStudentInput=>",createStudentInput);
      return await this.studentService.create(createStudentInput);
    } catch (error) {
      console.log("error=>>>",error);
      throw new Error(error.message);
    }
  }

  @Query(() => [Student])
  async studentsWithFilters(
    @Args('filter') filter: GetStudentFilterInput,
  ): Promise<Student[]> {
    try {
      return await this.studentService.findStudentsWithFilters(filter);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
