import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassResolver } from './class.resolver';
import { Classes } from './class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classes])],  // Registers the `Classes` entity with TypeORM.
  providers: [ClassService, ClassResolver],
  exports: [ClassService, ClassResolver],  // Exports services for use in other modules.
})
export class ClassModule {}
