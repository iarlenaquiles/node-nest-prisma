import { Test, TestingModule } from '@nestjs/testing';
import { AccountModule } from '../../account/account.module';
import { AuthModule } from '../../auth/auth.module';
import { ContentModule } from '../../content/content.module';
import { UserModule } from '../../user/user.module';
import { HealthModule } from '../../health/health.module';
import { AppModule } from '../app.module';

describe('AuthModule', () => {
  let appModule: TestingModule = null;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
    expect(appModule.get(HealthModule)).toBeInstanceOf(HealthModule);
    expect(appModule.get(AuthModule)).toBeInstanceOf(AuthModule);
    expect(appModule.get(AccountModule)).toBeInstanceOf(AccountModule);
    expect(appModule.get(UserModule)).toBeInstanceOf(UserModule);
    expect(appModule.get(ContentModule)).toBeInstanceOf(ContentModule);
  });
});
