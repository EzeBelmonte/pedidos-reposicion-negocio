import { useContext } from "react";
import { OrderContext } from "../providers/OrderProvider";

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder debe usarse dentro de OrderProvider"
    );
  }

  return context;
}