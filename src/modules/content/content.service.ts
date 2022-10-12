import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentEntity } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto): Promise<ContentEntity> {
    return this.prisma.content.create({
      data: createContentDto,
      include: {
        createdBy: true,
        tags: true,
      },
    });
  }

  findAll(
    contentWhereInput: Prisma.ContentWhereInput,
  ): Promise<ContentEntity[] | null> {
    return this.prisma.content.findMany({
      where: contentWhereInput,
    });
  }
}
