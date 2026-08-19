import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { ProductForm } from "@/components/product/ProductForm";
import { Button } from "@/components";
import type { Product } from "@/types";

const Home = () => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const {
    products,
    isLoading,
    error,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProducts();

  if (isLoading) {
    return <p>Cargando productos...</p>;
  }

  {error && (
    <p>
      {error}
    </p>
  )}

  return (
    <main>
      <h1>Productos</h1>

      <ProductForm 
        product={editingProduct}
        onAdd={addProduct} 
        onEdit={editProduct}
        onCancel={() => setEditingProduct(undefined)}
      />

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.brand} - art. {product.article}

            <Button onClick={() => setEditingProduct(product)}>
              Editar
            </Button>

            <Button onClick={() => deleteProduct(product.id)}>
              Eliminar
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Home;