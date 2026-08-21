import { createContext, useCallback, useMemo, useState, useEffect, type ReactNode } from "react";

import type { OrderList } from "@/types/order.type";
import type { OrderContextType } from "../types/orderContextType.type";

import {
  getOrders,
  createOrder,
  updateOrder,
  updateOrderStatusStorage,
  deleteOrder,
} from "../../services/orders.storage";

export const OrderContext =
  createContext<OrderContextType | null>(null);

type Props = {
  children: ReactNode;
}

export function OrderProvider({ children }: Props) {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storageOrders = getOrders();

      setOrders(storageOrders);
      setError(null);
    } catch (error) {
      console.error("No se puedieron cargar los pedidos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addOrder = useCallback((order: OrderList) => {
    try {
      createOrder(order);

      setOrders((currentOrders) => [
        ...currentOrders,
        order,
      ]);
      setError(null);
    } catch (error) {
      console.error(error);

      setError("No se pudo guardar el pedido.");
    }
  }, []);

  const editOrder = useCallback((order: OrderList) => {
    try {
      updateOrder(order);

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder.id === order.id
            ? order
            : currentOrder
        )
      );

      setError(null);
    } catch (error) {
      console.error(error);

      setError("No se pudo actualizar el pedido.");
    }
  }, []);

  const updateOrderStatus = useCallback((
    id: number,
    status: OrderList["status"]
  ) => {
    try {
      updateOrderStatusStorage(id, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) => 
          order.id === id
            ? {
                ...order,
                status,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      setError(null);
    } catch (error) {
      console.error(error);

      setError("No se pudo actualizar el estado del pedido.");
    }
  }, []);

  const removeOrder = useCallback((id: number) => {
    try {
      deleteOrder(id);

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order.id !== id
        )
      );

      setError(null);
    } catch (error) {
      console.error(error);

      setError("No se pudo eliminar el pedido.");
    }
  }, []);

  const value = useMemo(
    () => ({
      orders,
      isLoading,
      error,
      addOrder,
      editOrder,
      updateOrderStatus,
      removeOrder,
    }),
    [
      orders,
      isLoading,
      error,
      addOrder,
      editOrder,
      updateOrderStatus,
      removeOrder,
    ]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}