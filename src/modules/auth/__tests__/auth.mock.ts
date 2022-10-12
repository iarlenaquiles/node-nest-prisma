import { Token } from '@prisma/client';
import { LoginDto } from './../dto/login.dto';
import { LoginEntity, RefreshEntity } from './../entities/auth.entity';

export const mockAccount = {
  id: '1',
  email: 'jonhdoe@test.com',
  password: 'Pass12345678',
  role: 'USER',
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

export const mockLogin: LoginEntity = {
  access_token: {
    access: {
      token: 'abcdefc1234567890',
      expires: new Date(),
    },
    refresh: {
      token: 'abcdefc1234567890',
      expires: new Date(),
    },
  },
};

export const mockLoginDto: LoginDto = {
  email: 'jonhdoe@test.com',
  password: 'Pass12345678',
};

export const mockRefresh: RefreshEntity = {
  access_token: {
    access: {
      token: 'abcdefc1234567890',
      expires: new Date(),
    },
    refresh: {
      token: 'abcdefc1234567890',
      expires: new Date(),
    },
  },
};

export const mockTokenRegistry = (token: string): Token => ({
  id: '1',
  accountId: '1',
  token,
  expires: new Date(),
  blacklisted: false,
  type: 'ACCESS',
});
