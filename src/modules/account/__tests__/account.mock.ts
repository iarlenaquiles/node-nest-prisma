import { Role } from '@prisma/client';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountEntity } from '../entities/account.entity';

export const account: AccountEntity = {
  id: '1',
  email: 'jonhdoe@test.com',
  password: 'Pass12345678',
  role: Role.USER,
  user: {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
    accountId: '1',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const accountDto: CreateAccountDto = {
  email: 'jonhdoe@test.com',
  password: 'Pass12345678',
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
};
