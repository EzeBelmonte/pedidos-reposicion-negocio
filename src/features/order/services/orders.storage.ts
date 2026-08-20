import type { OrderList } from "@/types/order.type";

const ORDERS_STORAGE_KEY = "orders";

//===================================
// OBTENER TODAS LAS ORDENES
//===================================
export const getOrders = (): OrderList[] => {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

  if (!storedOrders) {
    return [];
  }

  return JSON.parse(storedOrders);
}

//===================================
// GUARDAR ORDEN
//===================================
export const saveOrders = (orders: OrderList[]) => {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders)
  );
}

//===================================
// CREAR ORDEN
//===================================
export const createOrder = (order: OrderList) => {
  const orders = getOrders();

  const updatedOrders = [
    ...orders,
    order,
  ];

  saveOrders(updatedOrders);
}

//===================================
// OBTENER ORDEN POR ID
//===================================
export const getOrderById = (
  id: number
): OrderList | undefined => {
  const orders = getOrders();

  return orders.find(
    (order) => order.id === id
  );
}

//===================================
// ACTUALIZAR ORDEN
//===================================
export const updateOrder = (updateOrder: OrderList) => {
  const orders = getOrders();

  const updatedOrders = orders.map((order) => 
    order.id === updateOrder.id
    ? updateOrder
    : order
  );

  saveOrders(updatedOrders);
}

//===================================
// ELIMINAR ORDEN
//===================================
export const deleteOrder = (id: number) => {
  const orders = getOrders();

  const updatedOrders = orders.filter(
    (order) => order.id !== id
  );

  saveOrders(updatedOrders);
}