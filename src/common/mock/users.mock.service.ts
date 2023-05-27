import { Injectable, NotFoundException } from '@nestjs/common';
import { NOT_FOUND_MESSAGE } from '../messages/errors';

@Injectable()
export class UsersMockService {
  private hasData = true;

  changeHasData(hasData: boolean) {
    this.hasData = hasData;
  }

  findOne() {
    if (!this.hasData)
      return Promise.reject(new NotFoundException(NOT_FOUND_MESSAGE('user')));
    return Promise.resolve({
      password: 'this is a passport',
      name: 'David',
      email: 'david.alfonso@gmail.com',
      rol: {
        rolesOnPermissions: [
          { permission: { name: 'permission1' } },
          { permission: { name: 'permission2' } },
          { permission: { name: 'permission3' } },
        ],
      },
    });
  }
}
