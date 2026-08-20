import type { Dispatch, SetStateAction } from "react";

import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";

import Modal from "../Modal";
import { Button } from "@/components";
import SimpleSizesCard from "./SimpleSizesCard";

type Props = {
  item: OrderItem;
  onChangeQuantity: (
    size: ShoeSize,
    quantity: number,
  ) => void;
  simpleSizes: ShoeSize[];
  selectedSimpleSizes: ShoeSize[];
  setSelectedSimpleSizes: Dispatch<SetStateAction<ShoeSize[]>>;
  isSimpleSizeModalOpen: boolean;
  closeModal: () => void;
  onAccept: () => void;
};

const SimpleSizes = ({
  item,
  selectedSimpleSizes,
  simpleSizes,
  setSelectedSimpleSizes,
  onChangeQuantity,
  isSimpleSizeModalOpen,
  closeModal,
  onAccept,
}: Props) => {

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
      {simpleSizes.length > 0 && (
        <div className="
          flex flex-wrap gap-2 items-center
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

      <Modal
        open={isSimpleSizeModalOpen}
        onClose={closeModal}
      >
        <SimpleSizesCard 
          selectedSimpleSizes={selectedSimpleSizes}
          setSelectedSimpleSizes={setSelectedSimpleSizes}
          onCancel={closeModal}
          onAccept={onAccept}
        />
      </Modal>
    </>
  )
}

export default SimpleSizes;