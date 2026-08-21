import type { OrderList } from "@/types/order.type";

export interface OrderContextType {
  orders: OrderList[];
  isLoading: boolean;
  error: string | null;

  addOrder: (order: OrderList) => void;
  editOrder: (order: OrderList) => void;
  updateOrderStatus: (
    id: number,
    status: OrderList["status"]
  ) => void;
  removeOrder: (id: number) => void;

}