export const NOT_FOUND_MESSAGE = (name: string) =>
  `${name.toLowerCase()} not found`;

export const CONFLICT_PRODUCT_URL = (urls: string[]) =>
  `product with urls ${urls.join(' and ')} exists`;

export const CONFLICT_NO_STOCK_QUANTITY = `the product's stock quantity can not be 0`;
export const INVALID_CREDENTIALS = 'invalid credentials';
export const USER_IS_UNAUTHORIZED = 'user is unauthorized';
