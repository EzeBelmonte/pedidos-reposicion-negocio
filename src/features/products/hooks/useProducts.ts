import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { productsStorage } from "@/storage/products.storage";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);

        // Obtenemos los productos guardados
        const storedProducts = await productsStorage.get();

        setProducts(storedProducts);
      } catch {
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const addProduct = async (
    brand: string, 
    article: string
  ) => {
    try {
      setError(null);

      const newProduct: Product = {
        id: Date.now(),
        brand,
        article,
      }

      const newProducts = [...products, newProduct];

      await productsStorage.save(newProducts);

      setProducts(newProducts);
    } catch {
      setError("No se pudo guardar el producto.");
    }
  }

  const editProduct = async (
    id: number,
    brand: string,
    article: string
  ) => {
    try {
      setError(null);

      const newProducts = products.map((product) => 
        product.id === id
          ? {
              ...product,
              brand,
              article,
            }
          : product
      );

      await productsStorage.save(newProducts);

      setProducts(newProducts);
    } catch {
      setError("No se pudo modificar el producto.");
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setError(null);

      const newProducts = products.filter(
        (product) => product.id !== id
      );

      await productsStorage.save(newProducts);
      
      setProducts(newProducts);
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  }

  return {
    // Estados
    products,
    isLoading,
    error,

    // Acciones
    addProduct,
    editProduct,
    deleteProduct,
  }
}