import { UserService } from './../user/user.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ContentEntity } from './entities/content.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContentEntity })
  async create(
    @Request() req,
    @Body() createContentDto: CreateContentDto,
  ): Promise<ContentEntity> {
    const user = await this.userService.findOne({
      accountId: req.user.accountId,
    });
    const content = { ...createContentDto, createdById: user.id };
    return this.contentService.create(content);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContentEntity, isArray: true })
  async findAll(@Request() req): Promise<ContentEntity[]> {
    const user = await this.userService.findOne({
      accountId: req.user.accountId,
    });
    return this.contentService.findAll({ createdById: user.id });
  }
}
