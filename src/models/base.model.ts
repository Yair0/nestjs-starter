import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true, description: 'ID and Dates for all models' })
export abstract class BaseModel {
  @Field((type) => ID)
  id: number;
  //   @Field({
  //     description: 'Identifies the date and time when the object was created.',
  //   })
  //   createdAt: Date;
  //   @Field({
  //     description:
  //       'Identifies the date and time when the object was last updated.',
  //   })
  //   updatedAt: Date;
}
