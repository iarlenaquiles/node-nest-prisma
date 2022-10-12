import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    AccountService,
    PrismaService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
