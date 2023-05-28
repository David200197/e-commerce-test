import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociatedImagesMockService {
  async findAllByUrls() {
    return [];
  }

  async deleteByUrls() {
    return [];
  }
}
