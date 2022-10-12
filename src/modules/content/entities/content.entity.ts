import { ApiProperty } from '@nestjs/swagger';
import { Content } from '@prisma/client';

export class ContentEntity implements Content {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdById: string;

  @ApiProperty()
  richContent: string;

  @ApiProperty()
  videoContent: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
