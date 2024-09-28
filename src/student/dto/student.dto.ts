import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  classId: number;

  @Field()
  email: string;
}

@InputType()
export class GetStudentFilterInput {
  @Field({ nullable: true })  // class filter can be optional
  classId?: number;

  @Field( { nullable: true })  // year filter can be optional
  year?: number;
}