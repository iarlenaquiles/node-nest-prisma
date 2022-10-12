import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../strategies/jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PassportModule,
      ],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('should return the payload for complete authorization scopes', async () => {
      const mockPayload = {
        sub: 'uuid',
      };

      const response = await jwtStrategy.validate(mockPayload);

      expect(response).toEqual({
        accountId: 'uuid',
      });
    });
  });
});
