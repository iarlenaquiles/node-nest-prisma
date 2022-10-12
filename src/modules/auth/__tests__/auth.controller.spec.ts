import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { AccountService } from '../../account/account.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { mockAccount, mockLoginDto, mockTokenRegistry } from './auth.mock';

import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let accountService: AccountService;
  let jwtService: JwtService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: new ConfigService().get('JWT_SECRET'),
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, AccountService, PrismaService, JwtStrategy],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    accountService = moduleRef.get<AccountService>(AccountService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should be a valid logged', async () => {
      const password = await bcrypt.hash(mockLoginDto.password, 10);
      const token = await jwtService.sign({}, { expiresIn: '1h' });

      prisma.account.findUnique = jest
        .fn()
        .mockReturnValue({ ...mockAccount, password });
      prisma.token.create = jest.fn().mockReturnValue(mockTokenRegistry(token));

      const response = await authController.login(mockLoginDto);

      expect(response).toEqual({
        access_token: {
          access: {
            token: expect.any(String),
            expires: expect.any(Date),
          },
          refresh: {
            token: expect.any(String),
            expires: expect.any(Date),
          },
        },
      });
    });

    it('should be not found user to login', async () => {
      prisma.account.findUnique = jest.fn().mockReturnValue(null);
      const fn = authController.login(mockLoginDto);
      expect(fn).rejects.toThrowError(UnauthorizedException);
    });

    it('should be not a password', async () => {
      const password = await bcrypt.hash(mockLoginDto.password, 10);
      prisma.account.findUnique = jest
        .fn()
        .mockReturnValue({ ...mockAccount, password });

      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      const fn = authController.login(mockLoginDto);
      expect(fn).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('should be refreshed', async () => {
      const token = await jwtService.sign({}, { expiresIn: '1h' });
      prisma.token.findFirst = jest.fn().mockReturnValue(mockTokenRegistry);
      prisma.token.create = jest.fn().mockReturnValue(mockTokenRegistry);
      prisma.token.deleteMany = jest.fn().mockReturnValue([]);
      accountService.findById = jest.fn().mockReturnValue(mockAccount);

      const response = await authController.refreshToken({
        refreshToken: token,
      });
      expect(response).toEqual({
        access_token: {
          access: {
            token: expect.any(String),
            expires: expect.any(Date),
          },
          refresh: {
            token: expect.any(String),
            expires: expect.any(Date),
          },
        },
      });
    });

    it('should not found token to refresh', async () => {
      const token = await jwtService.sign({}, { expiresIn: '1h' });
      jwtService.verify = jest.fn().mockReturnValue(false);

      const fn = authController.refreshToken({
        refreshToken: token,
      });

      expect(fn).rejects.toThrowError(
        new HttpException('Token not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should found token but not found account refresh', async () => {
      const token = await jwtService.sign({}, { expiresIn: '1h' });
      prisma.token.findFirst = jest.fn().mockReturnValue(mockTokenRegistry);
      prisma.token.deleteMany = jest.fn().mockReturnValue([]);
      accountService.findById = jest.fn().mockReturnValue(null);

      const fn = authController.refreshToken({
        refreshToken: token,
      });

      expect(fn).rejects.toThrowError(
        new HttpException('Account not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('logout', () => {
    it('should be logout', async () => {
      prisma.token.deleteMany = jest.fn().mockReturnValue([]);
      const token = await jwtService.sign({}, { expiresIn: '1h' });
      const response = await authController.logout({
        refreshToken: token,
      });
      expect(response).toBeUndefined();
    });
  });
});
