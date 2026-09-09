import * as XLSX from "xlsx";

import type { OrderList } from "@/types/order.type";
import type { Product } from "@/types";

import {
  simpleShoeSizes,
  compoundShoeSizes,
} from "@/data/shoeSizes";

const allShoeSizes = [
  ...simpleShoeSizes,
  ...compoundShoeSizes,
];

export const generateOrdersXlsx = (
  orders: OrderList[],
  products: Product[]
): Uint8Array => {
  const completedOrders = orders.filter(
    (order) => order.status === "done"
  );

  const rows: (string | number)[][] = [];

  // Encabezados
  rows.push([
    "Pedido",
    "Producto",
    ...allShoeSizes,
  ]);

  completedOrders.forEach((order) => {
    order.items.forEach((item, itemIndex) => {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return;
      }

      const productName =
        `${product.brand} art: ${product.article}`;

      const quantities = allShoeSizes.map(
        (size) => item.quantities[size] ?? ""
      );

      rows.push([
        itemIndex === 0
          ? order.title ?? "Sin título"
          : "",
        productName,
        ...quantities,
      ]);
    });
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Pedidos"
  );

  const xlsxData = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  return new Uint8Array(xlsxData);
};