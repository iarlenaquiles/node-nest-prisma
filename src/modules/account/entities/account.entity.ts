import { Account, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.entity';

export class AccountEntity implements Account {
  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  user?: UserEntity;
}
