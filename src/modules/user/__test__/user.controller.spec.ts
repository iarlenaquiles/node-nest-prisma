import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { mockUserEntity } from './user.mock';

describe('UserController', () => {
  let userController: UserController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [PrismaService, UserService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {};
          return true;
        },
      })
      .compile();

    userController = moduleRef.get<UserController>(UserController);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findById', () => {
    it('should return single user', async () => {
      prisma.user.findUnique = jest.fn().mockReturnValue(mockUserEntity);

      const response = await userController.findById(mockUserEntity.id);
      expect(response).toEqual(mockUserEntity);
    });
  });

  describe('findAll', () => {
    it('should return array of user', async () => {
      prisma.user.findMany = jest.fn().mockReturnValue([mockUserEntity]);

      const response = await userController.findAll();
      expect(response).toEqual([mockUserEntity]);
    });
  });
});
