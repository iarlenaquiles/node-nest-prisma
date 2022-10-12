import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';

export class UserEntity implements UserModel {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  accountId: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
