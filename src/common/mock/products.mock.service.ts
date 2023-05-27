import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsMockService {
  findWithoutStockQuantity() {
    return [];
  }

  findAll() {
    return [];
  }

  findTotalElements() {
    return [];
  }

  findOneBySku() {
    return {};
  }

  create() {
    return { sku: 'sku' };
  }

  sell() {
    return {
      product: { sku: 'sku', sale: 'id' },
    };
  }

  update() {
    return { sku: 'sku' };
  }

  delete() {
    return { sku: 'sku' };
  }
}
