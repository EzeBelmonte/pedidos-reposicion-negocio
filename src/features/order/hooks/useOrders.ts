import { useEffect, useState } from "react";

import type { OrderList } from "@/types/order.type";

import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orders.storage";

export function useOrders() {
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

  const addOrder = (order: OrderList) => {
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
  }

  const editOrder = (order: OrderList) => {
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
  }

  const removeOrder = (id: number) => {
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
  }

  return {
    // Estados
    orders,
    isLoading,
    error,

    // Acciones
    addOrder,
    editOrder,
    removeOrder,
  }
}