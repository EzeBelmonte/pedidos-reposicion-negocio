import { useState } from "react";

import { useProducts } from "@/features/products/hooks/useProducts";
import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";
import { 
  Button, 
} from "@/components";
import Modal from "./Modal";
import SimpleSizes from "./SimpleSizes";

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
  const [isSimpleSizeModalOpen, setIsSimpleSizeModalOpen] = useState(false);
  const [selectedSimpleSizes, setSelectedSimpleSizes] = useState<ShoeSize[]>([]);
  const [simpleSizes, setSimpleSizes] = useState<ShoeSize[]>([]);

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

  const handleAcceptSimpleSizes = () => {
    setSimpleSizes(selectedSimpleSizes);
    setIsSimpleSizeModalOpen(false);
  };

  return (
    <>
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

        {/* Mostramos los números seleccionados */}
        {simpleSizes.length > 0 && (
          <div>
            {simpleSizes.map((size) => (
              <div
                key={size}
              >
                <span>
                  {size}
                </span>

                <div>
                  <Button
                    onClick={() => {
                      const currentQuantity =
                        item.quantities[size] ?? 0;

                      if (currentQuantity > 0) {
                        onChangeQuantity(
                          size,
                          currentQuantity - 1
                        );
                      }
                    }}
                  >
                    -
                  </Button>

                  <span>{item.quantities[size] ?? 0}</span>

                  <Button
                    onClick={() => {
                      const currentQuantity =
                        item.quantities[size] ?? 0;

                      onChangeQuantity(
                        size,
                        currentQuantity + 1
                      );
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Definir los números */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-[1.1rem]">
            Talles
          </p>

          <div className="flex gap-5">
            <Button
              onClick={() => {
                setSelectedSimpleSizes(simpleSizes);
                setIsSimpleSizeModalOpen(true)
              }}
            >
              Número simple
            </Button>

            <Button>
              Número compuesto
            </Button>
          </div>

        </div>

        <Button
          onClick={onRemove}
          className="bg-red-600 text-white px-2 py-1 rounded mt-5"
        >
          Eliminar
        </Button>
      </article>

      <Modal
        open={isSimpleSizeModalOpen}
        onClose={() => setIsSimpleSizeModalOpen(false)}
      >
        <SimpleSizes 
          selectedSimpleSizes={selectedSimpleSizes}
          setSelectedSimpleSizes={setSelectedSimpleSizes}
          onCancel={() => setIsSimpleSizeModalOpen(false)}
          onAccept={handleAcceptSimpleSizes}
        />
      </Modal>
    </>
  );
}

export default OrderProductCard;