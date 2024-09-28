import { Resolver, Query } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { Classes } from './class.entity';

@Resolver(() => Classes)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query(() => [Classes])
  async getAllClasses(): Promise<Classes[]> {
      try {
          return this.classService.getAllClasses();
      } catch (error) {
        throw new Error(error.message);
      }
  }
}
