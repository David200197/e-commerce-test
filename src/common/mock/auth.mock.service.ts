import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMockService {
  me() {
    return {};
  }
  login() {
    return {};
  }
}
