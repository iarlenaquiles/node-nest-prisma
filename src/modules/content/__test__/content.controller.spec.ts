import { mockUserEntity } from './../../user/__test__/user.mock';
import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt-auth.guard';
import { ContentController } from '../content.controller';
import { ContentService } from '../content.service';
import { UserService } from '../../user/user.service';
import {
  mockCreateContentDto,
  mockContentEntity,
  mockRequestUser,
} from './content.mock';

describe('ContentController', () => {
  let contentController: ContentController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [PrismaService, ContentService, UserService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            accountId: 'uuid1',
          };
          return true;
        },
      })
      .compile();

    contentController = moduleRef.get<ContentController>(ContentController);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(contentController).toBeDefined();
  });

  describe('create', () => {
    it('should create content', async () => {
      prisma.user.findUnique = jest.fn().mockReturnValue(mockUserEntity);
      prisma.content.create = jest.fn().mockResolvedValue(mockContentEntity);

      const response = await contentController.create(
        mockRequestUser,
        mockCreateContentDto,
      );

      expect(response).toEqual(mockContentEntity);
    });
  });

  describe('find all', () => {
    it('should create content', async () => {
      prisma.user.findUnique = jest.fn().mockReturnValue(mockUserEntity);
      prisma.content.findMany = jest
        .fn()
        .mockResolvedValue([mockContentEntity]);

      const response = await contentController.findAll(mockRequestUser);

      expect(response).toEqual([mockContentEntity]);
    });
  });
});
