import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { account, accountDto } from './account.mock';

describe('AccountController', () => {
  let accountController: AccountController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [PrismaService, AccountService],
    }).compile();

    accountController = moduleRef.get<AccountController>(AccountController);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('mount controller', () => {
    expect(accountController).toBeDefined();
  });

  describe('create', () => {
    it('should create account', async () => {
      prisma.account.findUnique = jest.fn().mockReturnValue(null);
      prisma.account.create = jest.fn().mockReturnValue(account);

      const response = await accountController.create(accountDto);
      expect(response).toEqual(account);
    });

    it('should create account already exist', async () => {
      prisma.account.findUnique = jest.fn().mockReturnValue(account);

      const fn = accountController.create(accountDto);

      expect(fn).rejects.toThrowError(
        new HttpException('Account already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('findById', () => {
    it('should return specify account', async () => {
      prisma.account.findUnique = jest.fn().mockReturnValue(account);
      const response = await accountController.findById(account.id);
      expect(response).toEqual(account);
    });

    it('should not found specify account', async () => {
      prisma.account.findUnique = jest.fn().mockReturnValue(null);

      const fn = accountController.findById(account.id);

      expect(fn).rejects.toThrowError(
        new HttpException('Account not found', HttpStatus.CONFLICT),
      );
    });
  });
});
