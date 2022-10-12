import { PrismaService } from 'nestjs-prisma';

const initialization = (app): void => {
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
};

export default initialization;
