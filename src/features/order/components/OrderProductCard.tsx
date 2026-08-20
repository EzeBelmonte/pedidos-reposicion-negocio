import { useState } from "react";
import { shoeSizeRanges } from "@/data/shoeSizeRanges";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { OrderItem, ShoeSize } from "@/types/order.type";
import { Button, Input } from "@/components";

type Props = {
  item: OrderItem;
  onChangeProduct: (productId: number | null) => void;
  onChangeQuantity: (
    size: ShoeSize,
    quantity: number,
  ) => void;
  onRemove: () => void;
}

const OrderProductCard = ({ 
  item,
  onChangeProduct, 
  onChangeQuantity,
  onRemove,
}: Props) => {
  const {
    products,
    isLoading,
    error,
  } = useProducts();
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

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
    <article className="w-full border border-black rounded p-4 mt-4 bg-[#e5f5f5] font-semibold">
      {/* Seleccionar la marca y el artículo */}
      <select
        value={item.productId ?? ""}
        onChange={(e) => {
          const value = e.target.value;

          onChangeProduct(
            value === "" ? null : Number(value)
          );
        }}
        className="p-1 text-[1.1rem] border border-black"
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

      {/* Definir los números */}
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-[1.1rem]">
          Talles
        </p>

        {shoeSizeRanges.map((range, index) => {
          const isSelected = selectedRanges.includes(index);

          return (
            <>
              <label
                key={index}
                className="flex items-center gap-2"
              >
                <Input 
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    setSelectedRanges((currentRanges) => {
                      if (currentRanges.includes(index)) {
                        return currentRanges.filter(
                          (rangeIndex) => rangeIndex !== index
                        );
                      }

                      return [...currentRanges, index];
                    });
                  }}
                />
                <span>
                  {range[0]} - {range[range.length - 1]}
                </span>
    
              </label>

              {isSelected && (
                <div className="flex gap-2 flex-wrap ml-4 mb-4">
                  {range.map((size) => (
                    <div key={size} className="flex flex-col items-center">
                      <span>{size}</span>

                      <Input 
                        type="number"
                        min={0}
                        value={item.quantities[size] ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          onChangeQuantity(
                            size,
                            value === "" ? 0 : Number(value),
                          );
                        }}
                        className="w-[40px]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        })}
      </div>

      <Button
        onClick={onRemove}
        className="bg-red-600 text-white px-2 py-1 rounded mt-5"
      >
        Eliminar
      </Button>
    </article>
  );
}

export default OrderProductCard;