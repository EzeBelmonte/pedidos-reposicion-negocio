import type { OrderList } from "@/types/order.type";

export interface OrderContextType {
  orders: OrderList[];
  isLoading: boolean;
  error: string | null;

  addOrder: (order: OrderList) => Promise<void>;
  orderById: (orderId: number) => OrderList | undefined;
  editOrder: (order: OrderList) => Promise<void>;
  updateOrderStatus: (
    id: number,
    status: OrderList["status"]
  ) => Promise<void>;
  removeOrder: (id: number) => Promise<void>;

}