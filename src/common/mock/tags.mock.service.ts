import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsMockService {
  hasData = true;

  changeHasData(hasData: boolean) {
    this.hasData = hasData;
  }

  async getCount() {
    return 0;
  }

  async findAllByIds() {
    if (!this.hasData) return Promise.resolve([]);
    return Promise.resolve([
      { tagId: 'tagId1', productSku: 'sku1' },
      { tagId: 'tagId2', productSku: 'sku2' },
      { tagId: 'tagId2', productSku: 'sku2' },
    ]);
  }

  async findAll() {
    if (!this.hasData) return Promise.resolve([]);
    return Promise.resolve([
      { tagId: 'tagId1', productSku: 'sku1' },
      { tagId: 'tagId2', productSku: 'sku2' },
      { tagId: 'tagId2', productSku: 'sku2' },
    ]);
  }

  async create() {
    return {};
  }
}
