
import { useProductOrder } from "../hooks/useProductOrder";
import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";
import { 
  Button, 
} from "@/components";
import Modal from "./Modal";
import SimpleSizes from "./SimpleSizes";

import SelectProduct from "./SelectProduct";

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
    simpleSizes,
    isSimpleSizeModalOpen,
    selectedSimpleSizes,
    setSelectedSimpleSizes,
    handleAcceptSimpleSizes,
    handleOpenSimpleModal,
    handleCloseSimpleModal,
  } = useProductOrder();

  // Agregar pares
  const handleAdd = (
    item: OrderItem,
    size: ShoeSize
  ) => {
    const currentQuantity =
      item.quantities[size] ?? 0;

    onChangeQuantity(
      size,
      currentQuantity + 1
    );
  }
  
  // Quitar pares
  const handleRemove = (
    item: OrderItem,
    size: ShoeSize
  ) => {
    const currentQuantity =
      item.quantities[size] ?? 0;

    if (currentQuantity > 0) {
      onChangeQuantity(
        size,
        currentQuantity - 1
      );
    }
  }

  return (
    <>
      <article className="w-full border border-black rounded p-4 mt-4 bg-[#d5aff5] font-semibold">
        {/* Seleccionar la marca y el artículo */}
        <SelectProduct 
          item={item}
          onChangeProduct={onChangeProduct}
        />

        {/* Definir los números */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-[1.1rem]">
            Talles
          </p>

          {/* Mostramos los números seleccionados */}
          {simpleSizes.length > 0 && (
            <div className="
              flex flex-wrap gap-4 items-center
            ">
              {simpleSizes.map((size) => (
                <div
                  key={size}
                  className="
                    w-[46px]
                    bg-white
                    flex flex-col 
                    items-center 
                    border border-black -space-y-2 
                    rounded"
                >
                  <span className="text-[1.1rem] font-bold">
                    {size}
                  </span>

                  <div className="flex items-center">
                    <Button
                      onClick={() => handleRemove(item, size)}
                      className="text-black font-bold text-[1.3rem]"
                    >
                      -
                    </Button>

                    <span className="mx-1">{item.quantities[size] ?? 0}</span>

                    <Button
                      onClick={() => handleAdd(item, size)}
                      className="text-black font-bold text-[1.1rem]"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex mt-5 justify-between">
            <div className="flex gap-5">
              <Button
                onClick={handleOpenSimpleModal}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Número simple
              </Button>

              <Button
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Número compuesto
              </Button>
            </div>

            <Button
              onClick={onRemove}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Eliminar
            </Button>
          </div>

        </div>
      </article>

      <Modal
        open={isSimpleSizeModalOpen}
        onClose={handleCloseSimpleModal}
      >
        <SimpleSizes 
          selectedSimpleSizes={selectedSimpleSizes}
          setSelectedSimpleSizes={setSelectedSimpleSizes}
          onCancel={handleCloseSimpleModal}
          onAccept={handleAcceptSimpleSizes}
        />
      </Modal>
    </>
  );
}

export default OrderProductCard;