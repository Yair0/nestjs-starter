import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from './post.model';
import { BaseModel } from './base.model';

@ObjectType()
export class User extends BaseModel {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  email?: string;
  @Field((type) => [Post], { nullable: 'items' })
  posts: Post[];
}
