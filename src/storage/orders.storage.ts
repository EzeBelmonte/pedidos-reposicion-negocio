import { Preferences } from "@capacitor/preferences";

import type { OrderList } from "@/types/order.type";

const ORDERS_STORAGE_KEY = "orders";

//===================================
// OBTENER TODAS LAS ORDENES
//===================================
export const getOrders = async (): Promise<OrderList[]> => {
  const { value } = await Preferences.get({
    key: ORDERS_STORAGE_KEY,
  });

  if (!value) {
    return [];
  }

  return JSON.parse(value);
};

//===================================
// GUARDAR ORDENES
//===================================
export const saveOrders = async (
  orders: OrderList[]
): Promise<void> => {
  await Preferences.set({
    key: ORDERS_STORAGE_KEY,
    value: JSON.stringify(orders),
  });
};

//===================================
// CREAR ORDEN
//===================================
export const createOrder = async (
  order: OrderList
): Promise<void> => {
  const orders = await getOrders();

  const updatedOrders = [
    ...orders,
    order,
  ];

  await saveOrders(updatedOrders);
};

//===================================
// OBTENER ORDEN POR ID
//===================================
export const getOrderById = async (
  id: number
): Promise<OrderList | undefined> => {
  const orders = await getOrders();

  return orders.find(
    (order) => order.id === id
  );
};

//===================================
// ACTUALIZAR ORDEN
//===================================
export const updateOrder = async (
  updatedOrder: OrderList
): Promise<void> => {
  const orders = await getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === updatedOrder.id
      ? updatedOrder
      : order
  );

  await saveOrders(updatedOrders);
};

//===================================
// ACTUALIZAR ORDEN STATUS
//===================================
export const updateOrderStatusStorage = async (
  id: number,
  status: OrderList["status"]
): Promise<void> => {
  const orders = await getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === id
      ? {
          ...order,
          status,
          updatedAt: new Date().toISOString(),
        }
      : order
  );

  await saveOrders(updatedOrders);
};

//===================================
// ELIMINAR ORDEN
//===================================
export const deleteOrder = async (
  id: number
): Promise<void> => {
  const orders = await getOrders();

  const updatedOrders = orders.filter(
    (order) => order.id !== id
  );

  await saveOrders(updatedOrders);
};