import { Preferences } from "@capacitor/preferences";
import type { Product } from "@/types";

const PRODUCTS_KEY = "products";

export const productsStorage = {
  async get(): Promise<Product[]> {
    const { value } = await Preferences.get({
      key: PRODUCTS_KEY,
    });

    if (!value) {
      return[];
    }

    return JSON.parse(value);
  },

  async save(products: Product[]): Promise<void> {
    await Preferences.set({
      key: PRODUCTS_KEY,
      value: JSON.stringify(products),
    });
  },
}