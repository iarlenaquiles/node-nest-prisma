import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(accountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({
      where: { email: accountDto.email },
    });

    if (account)
      throw new HttpException('Account already exists', HttpStatus.CONFLICT);

    const user = accountDto.user;

    const password = await bcrypt.hash(accountDto.password, 10);

    const newAccount = await this.prisma.account.create({
      data: {
        email: accountDto.email,
        password,
        user: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return newAccount;
  }

  async findByEmail(email: string): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({
      where: { email: email },
    });
    return account;
  }

  async findById(id: string): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account)
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);

    return account;
  }
}
