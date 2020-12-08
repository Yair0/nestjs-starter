import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';

@ObjectType()
export class Post extends BaseModel {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  content?: string;
  @Field()
  published: boolean;
  @Field((type) => ID)
  authorId: string;
  @Field((type) => User)
  author: User;
}
