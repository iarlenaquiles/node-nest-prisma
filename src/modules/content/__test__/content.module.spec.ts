import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from '../content.controller';
import { ContentModule } from '../content.module';
import { ContentService } from '../content.service';

describe('UserModule', () => {
  let contentModule: TestingModule = null;

  beforeEach(async () => {
    contentModule = await Test.createTestingModule({
      imports: [ContentModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(contentModule).toBeDefined();
    expect(contentModule.get(ContentController)).toBeInstanceOf(
      ContentController,
    );
    expect(contentModule.get(ContentService)).toBeInstanceOf(ContentService);
  });
});
