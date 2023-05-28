import { Injectable } from '@nestjs/common';

@Injectable()
export class CopyAssociatedImagesMockService {
  async findAllByUrls() {
    return [];
  }

  async createIfNotExist() {
    return [];
  }
}
