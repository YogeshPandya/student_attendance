import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Classes } from '../class/class.entity';

@ObjectType()
@Entity()
export class Student {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field()
  @Column()
  email: string;

  @Field(() => Int)
  @Column({ default: 2024 })
  year: number;

  @Field(() => Int)
  @Column()
  classId: number;

  @Field()
  @Column()
  studentRollNo: string;

  @Field(() => Classes, { nullable: true })  // Expose the related class in the GraphQL schema
  @ManyToOne(() => Classes, (classes) => classes.students)
  @JoinColumn({ name: 'classId' })
  class: Classes;  // Replace classId with class to refer to the related Classes entity
}
