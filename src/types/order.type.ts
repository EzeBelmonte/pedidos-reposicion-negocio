import type { ShoeQuantities } from "./shoes.type";

export type OrderItem = {
  productId: number | null;
  quantities: ShoeQuantities;
};

export type OrderList = {
  id: number;
  supplier?: string;
  items: OrderItem[];
}