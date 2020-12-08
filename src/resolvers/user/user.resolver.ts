import {
  Resolver,
  Args,
  Query,
  Mutation,
  Parent,
  ResolveField,
  Int,
} from '@nestjs/graphql';

import { UserService } from 'src/services/user.service';
import { PrismaService } from './../../services/prisma.service';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { UserEntity } from '../../decorators/user.decorator';

import { UpdateUserInput } from './dto/update-user.input';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Query((returns) => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  //   @UseGuards(GqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.userService.updateUser({
      where: { id: user.id },
      data: newUserData,
    });
  }

  @ResolveField('posts', (returns) => [Post])
  async posts(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  }
}
