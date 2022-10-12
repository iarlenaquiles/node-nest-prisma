import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TerminusModule],
      controllers: [HealthController],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check', () => {
    it('should return health check - OK', async () => {
      const response = await healthController.check();
      expect(response).toEqual({
        status: 'ok',
        info: { 'nestjs-docs': { status: 'up' } },
        error: {},
        details: { 'nestjs-docs': { status: 'up' } },
      });
    });
  });
});
