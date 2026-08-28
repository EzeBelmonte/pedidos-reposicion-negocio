import { useProducts } from "@/features/products/hooks/useProducts";

import type { OrderItem } from "@/types/order.type";

type Props = {
  item: OrderItem;
  onChangeProduct: (productId: number | null) => void;
}

const SelectProduct = ({
  item,
  onChangeProduct,
}: Props) => {
  const {
    products,
    isLoading,
    error,
  } = useProducts();
  
  const sortedProducts = [...products].sort((a, b) => {
    const brandComparison = a.brand.localeCompare(b.brand);

    if (brandComparison !== 0) {
      return brandComparison;
    }

    return a.article.localeCompare(b.article);
  });

  if (isLoading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <select
      value={item.productId ?? ""}
      onChange={(e) => {
        const value = e.target.value;

        onChangeProduct(
          value === "" ? null : Number(value)
        );
      }}
      className="p-1 border border-black bg-white"
    >
      <option value="">
        Seleccionar producto
      </option>

      {sortedProducts.map((product) => (
        <option
          key={product.id}
          value={product.id}
          className="font-semibold"
        >
          {product.brand} - art. {product.article}
        </option>
      ))}
    </select>
  )
}

export default SelectProduct;