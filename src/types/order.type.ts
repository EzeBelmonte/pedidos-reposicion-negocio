import type { ShoeQuantities } from "./shoes.type";

export type OrderItem = {
  productId: number | null;
  quantities: ShoeQuantities;
};

export type OrderList = {
  id: number;
  title?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}