import { UserEntity } from './../entities/user.entity';

export const mockUserEntity: UserEntity = {
  id: '1',
  accountId: '1',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};
