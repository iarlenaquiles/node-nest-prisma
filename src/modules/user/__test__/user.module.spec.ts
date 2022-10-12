import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';

describe('UserModule', () => {
  let userModule: TestingModule = null;

  beforeEach(async () => {
    userModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(userModule).toBeDefined();
    expect(userModule.get(UserController)).toBeInstanceOf(UserController);
    expect(userModule.get(UserService)).toBeInstanceOf(UserService);
  });
});
