import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class PostIdArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  postId: number;
}
