import { Trash } from "lucide-react";
import { useProductOrder } from "../hooks/useProductOrder";
import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";
import { 
  Button, 
} from "@/components";

import SelectProduct from "./SelectProduct";
import SimpleSizes from "./simple/SimpleSizes";
import CompositeSizes from "./composite/CompositeSizes";

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
    selectedSimpleSizes,
    isSimpleSizeModalOpen,
    setSelectedSimpleSizes,
    handleOpenSimpleModal,
    handleCloseSimpleModal,
    handleAcceptSimpleSizes,
    compositeSizes,
    selectedCompositeSizes,
    isCompositeSizeModalOpen,
    setSelectedCompositeSizes,
    handleOpenCompositeModal,
    handleCloseCompositeModal,
    handleAcceptCompositeSizes,
  } = useProductOrder();

  return (
    <article className="w-full border border-black rounded p-4 mt-4 bg-[#2b6de7] font-semibold">
      {/* Seleccionar la marca y el artículo */}
      <SelectProduct 
        item={item}
        onChangeProduct={onChangeProduct}
      />

      {/* Definir los números */}
      <div className="flex flex-col gap-5 mt-4">
        <p className="text-white">
          Talles
        </p>

        {/* Mostramos los números seleccionados */}
        <SimpleSizes
          item={item}
          onChangeQuantity={onChangeQuantity}
          simpleSizes={simpleSizes}
          selectedSimpleSizes={selectedSimpleSizes}
          setSelectedSimpleSizes={setSelectedSimpleSizes}
          isSimpleSizeModalOpen={isSimpleSizeModalOpen}
          closeModal={handleCloseSimpleModal}
          onAccept={handleAcceptSimpleSizes}
        />

        <CompositeSizes
          item={item}
          onChangeQuantity={onChangeQuantity}
          compositeSizes={compositeSizes}
          selectedCompositeSizes={selectedCompositeSizes}
          setSelectedCompositeSizes={setSelectedCompositeSizes}
          isCompositeSizeModalOpen={isCompositeSizeModalOpen}
          closeModal={handleCloseCompositeModal}
          onAccept={handleAcceptCompositeSizes}
        />

        <div className="flex mt-5 justify-between">
          <div className="flex gap-5">
            <Button
              onClick={handleOpenSimpleModal}
              className="bg-[#ffffff] text-black px-2 py-1 rounded"
            >
              Número simple
            </Button>

            <Button
              onClick={handleOpenCompositeModal}
              className="bg-[#ffffff] text-black px-2 py-1 rounded"
            >
              Número compuesto
            </Button>
          </div>

          <Button
            onClick={onRemove}
            className="bg-white text-red-600 p-1 rounded"
          >
            <Trash />
          </Button>
        </div>

      </div>
    </article>
  );
}

export default OrderProductCard;