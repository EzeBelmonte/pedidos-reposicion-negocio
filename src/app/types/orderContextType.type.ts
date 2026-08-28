import type { OrderList } from "@/types/order.type";

export interface OrderContextType {
  orders: OrderList[];
  isLoading: boolean;
  error: string | null;

  addOrder: (order: OrderList) => void;
  orderById: (orderId: number) => OrderList | undefined;
  editOrder: (order: OrderList) => void;
  updateOrderStatus: (
    id: number,
    status: OrderList["status"]
  ) => void;
  removeOrder: (id: number) => void;

}