export type ShoeSize =
  | 17 | 18 | 19 | 20 | 21
  | 22 | 23 | 24 | 25 | 26 
  | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34
  | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;

export type ShoeQuantities = Partial<Record<ShoeSize, number>>;

export type OrderItem = {
  productId: number | null;
  quantities: ShoeQuantities;
};

export type OrderList = {
  id: number;
  supplier?: string;
  items: OrderItem[];
}