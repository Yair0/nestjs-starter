import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from '../../services/user.service';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
