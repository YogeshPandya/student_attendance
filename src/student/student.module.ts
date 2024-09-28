import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './student.entity';
import { ClassModule } from '../class/class.module';  // Import ClassModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    ClassModule,  // Import ClassModule to access ClassService and ClassResolver
  ],
  providers: [StudentService, StudentResolver],  // No need to include ClassService or ClassResolver here
})
export class StudentModule {}
