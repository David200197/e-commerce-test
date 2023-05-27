import { Injectable } from '@nestjs/common';
import { AssociatedImage, CopyAssociatedImage, User } from './interfaces';
import { PrismaMethods } from './prisma-methods';

@Injectable()
export class PrismaMockService {
  private hasData = true;

  changeHasData(hasData: boolean) {
    this.hasData = hasData;
  }

  get associatedImage() {
    const associatedImages: AssociatedImage[] = this.hasData
      ? [{ url: 'url1' }, { url: 'url2' }, { url: 'url3' }]
      : [];
    return new PrismaMethods<AssociatedImage>(associatedImages);
  }

  get copyAssociatedImage() {
    const copyAssociatedImages: CopyAssociatedImage[] = this.hasData
      ? [{ url: 'url1' }, { url: 'url2' }, { url: 'url3' }]
      : [];
    return new PrismaMethods<CopyAssociatedImage>(copyAssociatedImages);
  }

  get permission() {
    return new PrismaMethods();
  }

  get rol() {
    return new PrismaMethods();
  }

  get tag() {
    return new PrismaMethods();
  }

  get user() {
    const users: User[] = this.hasData
      ? [
          { email: 'email1', name: 'name1' },
          { email: 'email2', name: 'name2' },
          { email: 'email3', name: 'name3' },
        ]
      : [];
    return new PrismaMethods(users);
  }

  sales() {
    return new PrismaMethods();
  }
}