import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedImagesController } from './associated-images.controller';
import { AssociatedImagesService } from './associated-images.service';

describe('AssociatedImagesController', () => {
  let controller: AssociatedImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatedImagesController],
      providers: [AssociatedImagesService],
    }).compile();

    controller = module.get<AssociatedImagesController>(AssociatedImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
