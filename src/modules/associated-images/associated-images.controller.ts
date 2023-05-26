import { Controller } from '@nestjs/common';
import { AssociatedImagesService } from './associated-images.service';

@Controller('associated-images')
export class AssociatedImagesController {
  constructor(private readonly associatedImagesService: AssociatedImagesService) {}
}
