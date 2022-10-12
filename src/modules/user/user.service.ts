import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[] | null> {
    return this.prisma.user.findMany();
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
