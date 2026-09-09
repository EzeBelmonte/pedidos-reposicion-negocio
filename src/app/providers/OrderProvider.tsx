import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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
};

export function OrderProvider({ children }: Props) {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //===================================
  // CARGAR ORDENES
  //===================================

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storageOrders = await getOrders();

        setOrders(storageOrders);
        setError(null);
      } catch (error) {
        console.error(
          "No se pudieron cargar los pedidos.",
          error
        );

        setError("No se pudieron cargar los pedidos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  //===================================
  // AGREGAR ORDEN
  //===================================

  const addOrder = useCallback(
    async (order: OrderList) => {
      try {
        await createOrder(order);

        setOrders((currentOrders) => [
          ...currentOrders,
          order,
        ]);

        setError(null);
      } catch (error) {
        console.error(error);

        setError("No se pudo guardar el pedido.");
      }
    },
    []
  );

  //===================================
  // OBTENER ORDEN POR ID
  //===================================

  const orderById = useCallback(
    (orderId: number) => {
      return orders.find(
        (order) => order.id === orderId
      );
    },
    [orders]
  );

  //===================================
  // EDITAR ORDEN
  //===================================

  const editOrder = useCallback(
    async (order: OrderList) => {
      try {
        await updateOrder(order);

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
    },
    []
  );

  //===================================
  // ACTUALIZAR STATUS
  //===================================

  const updateOrderStatus = useCallback(
    async (
      id: number,
      status: OrderList["status"]
    ) => {
      try {
        await updateOrderStatusStorage(id, status);

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

        setError(
          "No se pudo actualizar el estado del pedido."
        );
      }
    },
    []
  );

  //===================================
  // ELIMINAR ORDEN
  //===================================

  const removeOrder = useCallback(
    async (id: number) => {
      try {
        await deleteOrder(id);

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
    },
    []
  );

  //===================================
  // CONTEXT VALUE
  //===================================

  const value = useMemo(
    () => ({
      orders,
      isLoading,
      error,
      addOrder,
      orderById,
      editOrder,
      updateOrderStatus,
      removeOrder,
    }),
    [
      orders,
      isLoading,
      error,
      addOrder,
      orderById,
      editOrder,
      updateOrderStatus,
      removeOrder,
    ]
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}