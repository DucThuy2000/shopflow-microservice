export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';
export const PRODUCT_SERVICE_PORT = 4001;

export const PRODUCT_PATTERNS = {
  FIND_ONE: 'product.find_one',
  CREATE: 'product.create',
} as const;

export const ORDER_EVENTS = {
  CREATED: 'order.created',
} as const;

// ===== interfaces/types
export interface ProductPayload extends Pick<
  IProduct,
  'name' | 'price' | 'stock'
> {}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdBy: number;
}

export interface OrderCreatedEvent {
  orderId: string;
  productId: string;
  quantity: number;
}
