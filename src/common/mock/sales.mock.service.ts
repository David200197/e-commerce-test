import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesMockService {
  findAll() {
    return [];
  }

  getTotalAmount() {
    return 0;
  }
}
