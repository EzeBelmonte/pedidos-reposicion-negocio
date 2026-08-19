export type Product = {
  id: number;
  brand: string;
  article: string;
};

export type OrderList = {
  id: number;
  title?: string;
  productIds: number[];
};