import type { OrderList } from "@/types/order.type";
import type { Product } from "@/types";

import {
  simpleShoeSizes,
  compoundShoeSizes,
} from "@/data/shoeSizes";

const CSV_SEPARATOR = ",";

//===================================
// TAMAÑOS DEL CSV
//===================================

const allShoeSizes = [
  ...simpleShoeSizes,
  ...compoundShoeSizes,
];

//===================================
// ESCAPAR VALOR CSV
//===================================

const escapeCsvValue = (value: string | number): string => {
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

//===================================
// GENERAR CSV
//===================================

export const generateOrdersCsv = (
  orders: OrderList[],
  products: Product[]
): string => {
  // Solamente pedidos realizados
  const completedOrders = orders.filter(
    (order) => order.status === "done"
  );

  // Encabezados
  const headers = [
    "Pedido",
    "Producto",
    ...allShoeSizes,
  ];

  const rows: string[] = [
    headers
      .map(escapeCsvValue)
      .join(CSV_SEPARATOR),
  ];

  // Productos de cada pedido
  completedOrders.forEach((order) => {
    order.items.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return;
      }

      const productName =
        `${product.brand} art: ${product.article}`;

      const quantities = allShoeSizes.map(
        (size) => item.quantities[size] ?? 0
      );

      const row = [
        order.title ?? "Sin título",
        productName,
        ...quantities,
      ];

      rows.push(
        row
          .map(escapeCsvValue)
          .join(CSV_SEPARATOR)
      );
    });
  });

  return rows.join("\n");
};