import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOkResponse({ type: AccountEntity })
  @ApiCreatedResponse()
  @ApiConflictResponse()
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return new AccountEntity(
      await this.accountService.create(createAccountDto),
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AccountEntity })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<AccountEntity> {
    return new AccountEntity(await this.accountService.findById(id));
  }
}
