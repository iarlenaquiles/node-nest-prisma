import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.userService.findOne({ id: String(id) }));
  }
}
