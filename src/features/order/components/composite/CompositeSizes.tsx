import type { Dispatch, SetStateAction } from "react";

import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";

import Modal from "../Modal";
import { Input } from "@/components";
import CompositeSizesCard from "./CompositeSizesCard";

type Props = {
  item: OrderItem;
  onChangeQuantity: (
    size: ShoeSize,
    quantity: number,
  ) => void;
  compositeSizes: ShoeSize[];
  selectedCompositeSizes: ShoeSize[];
  setSelectedCompositeSizes: Dispatch<SetStateAction<ShoeSize[]>>;
  isCompositeSizeModalOpen: boolean;
  closeModal: () => void;
  onAccept: () => void;
};

const CompositeSizes = ({
  item,
  selectedCompositeSizes,
  compositeSizes,
  setSelectedCompositeSizes,
  onChangeQuantity,
  isCompositeSizeModalOpen,
  closeModal,
  onAccept,
}: Props) => {

  // Agregar pares
  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    size: ShoeSize
  ) => {
    const value = e.target.value;

    if (value === "") {
      onChangeQuantity(size, 0);
      return;
    }

    onChangeQuantity(size, Number(value));
  }

  return (
    <>
      {compositeSizes.length > 0 && (
        <div className="
          grid grid-cols-4 justify-items-center gap-2
        ">
          {compositeSizes.map((size) => (
            <div
              key={size}
              className="
                w-full
                bg-white
                flex flex-col 
                items-center 
                border border-black 
                rounded"
            >
              <span className="text-[1.1rem] font-semibold">
                {size}
              </span>

              <div className="w-full flex justify-center mt-1 px-2 py-1">
                <Input 
                  type="number"
                  min={0}
                  value={item.quantities[size] ?? 0}
                  placeholder="0"
                  onChange={(e) => handleChangeQuantity(e, size)}
                  onFocus={(e) => {
                    if (e.target.value === "0") {
                      e.target.select();
                    }
                  }}
                  className="
                    w-full
                    text-center
                    font-bold
                    border
                    border-black
                    rounded
                    py-1
                    outline-none
                    focus:border-black
                  "
                />

              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isCompositeSizeModalOpen}
        onClose={closeModal}
      >
        <CompositeSizesCard 
          selectedCompositeSizes={selectedCompositeSizes}
          setSelectedCompositeSizes={setSelectedCompositeSizes}
          onCancel={closeModal}
          onAccept={onAccept}
        />
      </Modal>
    </>
  )
}

export default CompositeSizes;