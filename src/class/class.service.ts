import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classes } from './class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Classes)
    private readonly classRepository: Repository<Classes>,
  ) {}

  async getAllClasses(): Promise<Classes[]> {
    try {
        return await this.classRepository.find();
    } catch (error) {
        throw new HttpException('Error fetching class', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  async getClassesById(classId: number): Promise<{ name: string }> {
    try {
      const classEntity = await this.classRepository.findOneBy({ id: classId });
  
      if (!classEntity) {
        throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      }
      return { name: classEntity.name };
    } catch (error) {
      throw new HttpException('Error fetching class', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
