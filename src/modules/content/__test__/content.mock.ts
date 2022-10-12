import { CreateContentDto } from '../dto/create-content.dto';
import { ContentEntity } from '../entities/content.entity';

export const mockRequestUser = {
  user: {
    id: 'uuid1',
  },
};

export const mockCreateContentDto: CreateContentDto = {
  title: 'mock title',
  description: 'mock description',
  richContent: 'mock rich content',
  videoContent: 'mock video content',
  createdById: 'uuid123',
};

export const mockContentEntity: ContentEntity = {
  id: 'mock id',
  title: 'mock title',
  description: 'mock description',
  createdById: 'mock createdById',
  richContent: 'mock rich content',
  videoContent: 'mock video content',
  createdAt: new Date(),
  updatedAt: new Date(),
};
