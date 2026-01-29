import type { Product } from "./Product";

export interface CartResponse {
  id: number;
  user: {
    id: number;
    fullName: string;
    email: string;
    role: string;
  };
  items: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
