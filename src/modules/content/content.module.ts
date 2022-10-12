import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from '../user/user.service';

@Module({
  controllers: [ContentController],
  providers: [PrismaService, ContentService, UserService],
})
export class ContentModule {}
