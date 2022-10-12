import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '../health/health.module';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';
import { AuthModule } from '../auth/auth.module';
import { ContentModule } from '../content/content.module';
import { loggingMiddleware } from '../../middlewares/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
        prismaOptions: { log: ['info', 'query', 'error'] },
        explicitConnect: true,
      },
    }),
    HealthModule,
    AuthModule,
    AccountModule,
    UserModule,
    ContentModule,
  ],
})
export class AppModule {}
