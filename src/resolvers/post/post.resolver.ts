import {
  Resolver,
  Args,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

import { PostService } from 'src/services/post.service';
import { PrismaService } from './../../services/prisma.service';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { UserIdArgs } from '../../models/args/user-id.args';
import { PostIdArgs } from '../../models/args/post-id.args';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private prisma: PrismaService,
  ) {}

  @Query((returns) => [Post])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .posts({ where: { published: true } });
  }

  @Query((returns) => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findUnique({ where: { id: id.postId } });
  }

  @ResolveField('author', (returns) => User)
  async author(@Parent() post: Post) {
    return this.prisma.post.findUnique({ where: { id: post.id } }).author();
  }
}
