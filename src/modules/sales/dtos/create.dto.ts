import { CopyAssociatedImage, ProductsOnTags } from '@prisma/client';

export class CreateDto {
  sku: string;
  name: string;
  price: number;
  category: string;
  description: string;
  additionalInformation: string;
  assessment: number;
  copyAssociatedImages: CopyAssociatedImage[];
  productsOnTags: ProductsOnTags[];
}
