import { Injectable } from '@nestjs/common';
import {
  AssociatedImage,
  CopyAssociatedImage,
  Product,
  ProductsOnTags,
  User,
} from './interfaces';
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

  get sales() {
    return new PrismaMethods();
  }

  get product() {
    const products: Product[] = this.hasData
      ? [
          {
            sku: 'sku1',
            stockQuantity: 30,
            name: 'product1',
            additionalInformation: 'this is additional information product1',
            assessment: 10,
            associatedImages: [
              { url: 'url1' },
              { url: 'url2' },
              { url: 'url3' },
            ],
            category: 'this is a product1 category',
            description: 'this is a product1 description',
            price: 10,
            productsOnTags: [
              { productSku: 'productSku1', tagId: 'tagId1' },
              { productSku: 'productSku2', tagId: 'tagId2' },
              { productSku: 'productSku3', tagId: 'tagId3' },
            ],
          },
          {
            sku: 'sku2',
            stockQuantity: 20,
            name: 'product2',
            additionalInformation: 'this is additional information product2',
            assessment: 20,
            associatedImages: [
              { url: 'url1' },
              { url: 'url2' },
              { url: 'url3' },
            ],
            category: 'this is a product2 category',
            description: 'this is a product2 description',
            price: 20,
            productsOnTags: [
              { productSku: 'productSku1', tagId: 'tagId1' },
              { productSku: 'productSku2', tagId: 'tagId2' },
              { productSku: 'productSku3', tagId: 'tagId3' },
            ],
          },
        ]
      : [];
    return new PrismaMethods<Product>(products);
  }

  get productsOnTags() {
    const productsOnTags: ProductsOnTags[] = [
      { tagId: 'tagId1', productSku: 'productSku1' },
      { tagId: 'tagId2', productSku: 'productSku2' },
      { tagId: 'tagId3', productSku: 'productSku3' },
    ];
    return new PrismaMethods(productsOnTags);
  }
}
