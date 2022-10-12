import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthModule', () => {
  let authModule: TestingModule = null;

  beforeEach(async () => {
    authModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(authModule).toBeDefined();
    expect(authModule.get(AuthController)).toBeInstanceOf(AuthController);
    expect(authModule.get(AuthService)).toBeInstanceOf(AuthService);
  });
});
