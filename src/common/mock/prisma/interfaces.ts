export type AssociatedImage = { url: string };
export type CopyAssociatedImage = { url: string };
export type User = { name: string; email: string };
export type Product = {
  sku: string;
  name: string;
  price: number;
  stockQuantity: number;
  category: string;
  description: string;
  additionalInformation: string;
  assessment: number;
  associatedImages: { url: string }[];
  productsOnTags: { tagId: string; productSku: string }[];
};
export type ProductsOnTags = { tagId: string; productSku: string };
