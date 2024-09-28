import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()  // Marks this class as a GraphQL object type.
export class CustomResponse<T> {
  @Field()  // Marks this field as a GraphQL field with type 'Boolean'.
  status: boolean;

  @Field()  // Marks this field as a GraphQL field with type 'String'.
  message: string;

  @Field(() => [Int], { nullable: 'itemsAndList' })  // Marks this field as a GraphQL list field with items of type 'Int'.
  data: T[];
}
