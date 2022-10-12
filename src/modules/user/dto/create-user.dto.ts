import { UserEntity } from '../entities/user.entity';
import { IsString } from 'class-validator';

export class UserDto extends UserEntity {}

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
