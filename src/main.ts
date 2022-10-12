import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import Swagger from './configs/swagger';
import Prisma from './configs/prisma';
import Morgan from './middlewares/morgan';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Inicialize swagger
  Swagger(app);

  // gzip compression
  app.use(compression());

  // helmet
  app.use(helmet());

  // validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // logger
  app.use(Morgan.successHandler);
  app.use(Morgan.errorHandler);

  // Prisma: enable shutdown hook
  Prisma(app);

  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(
      `Server running on port http://localhost:${process.env.PORT}/docs`,
    );
  });
}

bootstrap();
