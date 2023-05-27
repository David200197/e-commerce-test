import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtMockService {
  sign(value: unknown) {
    return value;
  }
}
