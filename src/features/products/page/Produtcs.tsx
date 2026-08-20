import { useState } from "react";
import { CircleChevronLeft, SquarePen, Trash } from "lucide-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductForm } from "@/features/products/components/ProductForm";
import { Button, AlertError } from "@/components";
import type { Product } from "@/types";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

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

  if (error) {
    return <AlertError error={(error)} />
  }

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
    <section className="w-full flex flex-col items-center mb-10">
      <Link to="/">
        <Button className="absolute top-2 left-2 font-semiboldpx-2 py-1 rounded font-semibold">
          <CircleChevronLeft size={30} />
        </Button>
      </Link>

      <h1 className="bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded mt-5">
        Productos
      </h1>

      <ProductForm 
        product={editingProduct}
        onAdd={addProduct} 
        onEdit={handleEditProduct}
        onCancel={() => setEditingProduct(undefined)}
      />

      <ul className="
        w-[500px] max-h-[500px] 
        overflow-y-auto 
        flex flex-col 
        mt-10 p-2
        bg-[#2b6de7]
        border border-black
        rounded
      ">
        {sortedProducts.map((product, index) => (
          <li 
            key={product.id} 
            className={cn(`
              flex 
              items-center justify-between 
              font-semibold px-2 py-1`,
              index % 2 === 0 && "bg-[#4b88fa]"
            )}
          >
            <span className="text-white">
              {product.brand} - art. {product.article}
            </span>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setEditingProduct(product)}
                className="bg-white p-1 rounded"
              >
                <SquarePen size={20}/>
              </Button>

              <Button 
                onClick={() => deleteProduct(product.id)}
                className="bg-white text-red-600 p-1 rounded"
              >
                <Trash size={20} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Produtcs;