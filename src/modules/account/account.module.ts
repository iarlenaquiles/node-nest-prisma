import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [AccountController],
  providers: [PrismaService, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
