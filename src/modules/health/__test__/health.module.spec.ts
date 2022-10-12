import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from '../health.module';
import { HealthController } from '../health.controller';

describe('UserModule', () => {
  let healthModule: TestingModule = null;

  beforeEach(async () => {
    healthModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(healthModule).toBeDefined();
    expect(healthModule.get(HealthController)).toBeInstanceOf(HealthController);
  });
});
