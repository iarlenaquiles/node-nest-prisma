import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';
import { Token, TokenType } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { LoginDto } from './dto/login.dto';
import { AccountEntity } from '../account/entities/account.entity';
import { LoginEntity, RefreshEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken = ({ accountId, expires, type }): string => {
    const payload = {
      sub: accountId,
      type,
    };

    return this.jwtService.sign(payload, { expiresIn: expires });
  };

  private verifyToken = (token: string, type: TokenType): Promise<Token> => {
    const payload = this.jwtService.verify(token);

    if (!payload) return null;

    const response = this.prisma.token.findFirst({
      where: {
        token,
        type,
        accountId: payload.sub,
        blacklisted: false,
      },
    });

    return response;
  };

  private saveToken = async ({
    token,
    accountId,
    expires,
    type,
    blacklisted = false,
  }): Promise<Token> => {
    const tokenDoc = await this.prisma.token.create({
      data: {
        token,
        accountId,
        expires,
        type,
        blacklisted,
      },
    });
    return tokenDoc;
  };

  private removeToken = async (refreshToken): Promise<void> => {
    await this.prisma.token.deleteMany({
      where: {
        token: refreshToken,
        type: TokenType.REFRESH,
        blacklisted: false,
      },
    });
  };

  private generateAuthTokens = async (
    account: AccountEntity,
  ): Promise<LoginEntity | RefreshEntity> => {
    const accessTokenExpires = moment().add(1, 'days');
    const accessToken = await this.generateToken({
      accountId: account.id,
      expires: '1d',
      type: TokenType.ACCESS,
    });

    const refreshTokenExpires = moment().add(7, 'days');
    const refreshToken = await this.generateToken({
      accountId: account.id,
      expires: '7d',
      type: TokenType.REFRESH,
    });

    await this.saveToken({
      token: refreshToken,
      accountId: account.id,
      expires: refreshTokenExpires.toDate(),
      type: TokenType.REFRESH,
    });

    return {
      access_token: {
        access: {
          token: accessToken,
          expires: accessTokenExpires.toDate(),
        },
        refresh: {
          token: refreshToken,
          expires: refreshTokenExpires.toDate(),
        },
      },
    };
  };

  private validate = async (loginDto: LoginDto): Promise<AccountEntity> => {
    const account = await this.accountService.findByEmail(loginDto.email);

    if (!account) return null;

    const isValid = await bcrypt.compare(loginDto.password, account.password);

    if (isValid) {
      return {
        ...account,
        password: loginDto.password,
      };
    }
    return null;
  };

  async login(loginDto: LoginDto): Promise<LoginEntity> {
    const account = await this.validate({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!account) {
      throw new UnauthorizedException();
    }

    return this.generateAuthTokens(account);
  }

  async logout(refreshToken: string): Promise<void> {
    this.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<RefreshEntity> {
    const token = await this.verifyToken(refreshToken, TokenType.REFRESH);
    if (!token)
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);

    const account = await this.accountService.findById(token.accountId);
    if (!account)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);

    await this.removeToken(refreshToken);

    return this.generateAuthTokens(account);
  }
}
