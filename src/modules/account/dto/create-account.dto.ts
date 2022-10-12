import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { UserCreateDto } from '../../user/dto/create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { REGEX, MESSAGES } from '../account.utils';

export class CreateAccountDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UserCreateDto)
  user: UserCreateDto;
}
