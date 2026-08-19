import { useState } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";

import { ProductForm } from "@/components/product/ProductForm";
import { Button } from "@/components";
import type { Product } from "@/types";
import { Link } from "react-router-dom";

const Produtcs = () => {
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

  const handleEditProduct = async (
    id: number,
    brand: string,
    article: string
  ) => {
    await editProduct(id, brand, article);

    setEditingProduct(undefined);
  }

  // Prdenar los productos
  const sortedProducts = [...products].sort((a, b) => {
    const brandComparison = a.brand.localeCompare(b.brand);

    if (brandComparison !== 0) {
      return brandComparison;
    }

    return a.article.localeCompare(b.article);
  });

  return (
    <section className="w-full flex flex-col items-center text-white mb-10">
      <Link to="/">
        <Button className="absolute top-2 left-2 font-semibold bg-red-500 px-2 py-1 rounded">
          Volver
        </Button>
      </Link>

      <h1 className="text-[1.7rem] font-bold my-8">Productos</h1>

      <ProductForm 
        product={editingProduct}
        onAdd={addProduct} 
        onEdit={handleEditProduct}
        onCancel={() => setEditingProduct(undefined)}
      />

      <ul className="max-h-[500px] overflow-y-auto flex flex-col gap-4 mt-10 border border-white w-[500px] p-2 rounded">
        {sortedProducts.map((product) => (
          <li key={product.id} className="flex items-center justify-between text-[1.1rem] font-semibold">
            <span>
              {product.brand} - art. {product.article}
            </span>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setEditingProduct(product)}
                className="bg-orange-600 px-2 rounded"
              >
                Editar
              </Button>

              <Button 
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 px-2 rounded"
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Produtcs;