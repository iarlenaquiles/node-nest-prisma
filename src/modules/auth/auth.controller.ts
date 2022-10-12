import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Controller, Body, Post } from '@nestjs/common';
import { LoginEntity, RefreshEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginEntity })
  @ApiCreatedResponse()
  async login(@Body() loginDto: LoginDto): Promise<LoginEntity> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiCreatedResponse()
  async logout(@Body() logoutDto: LogoutDto): Promise<void> {
    return this.authService.logout(logoutDto.refreshToken);
  }

  @Post('refresh-token')
  @ApiOkResponse({ type: RefreshEntity })
  @ApiCreatedResponse()
  async refreshToken(
    @Body() refreshToken: RefreshTokenDto,
  ): Promise<RefreshEntity> {
    return this.authService.refresh(refreshToken.refreshToken);
  }
}
