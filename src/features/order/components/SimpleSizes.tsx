import type { Dispatch, SetStateAction } from "react";
import type { ShoeSize } from "@/types/shoes.type";
import { simpleShoeSizes } from "@/data/shoeSizes";
import { 
  Button,
  Input
} from "@/components";

type Props = {
  selectedSimpleSizes: ShoeSize[];
  setSelectedSimpleSizes: Dispatch<SetStateAction<ShoeSize[]>>;
  onCancel: () => void;
  onAccept: () => void;
}

const SimpleSizes = ({
  selectedSimpleSizes,
  setSelectedSimpleSizes,
  onCancel,
  onAccept,
}: Props) => {

  const handleCancel = () => {
    onCancel();

    setSelectedSimpleSizes([]);
  }

  return (
    <div className="bg-white p-5 rounded">
      <h2 className="text-xl font-bold mb-4">
        Seleccionar números
      </h2>

      <div className="grid grid-cols-4 gap-3">
        {simpleShoeSizes.map((size) => {
          const isSelected =
            selectedSimpleSizes.includes(size);

          return (
            <label
              key={size}
              className="flex items-center gap-2"
            >
              <Input
                type="checkbox"
                checked={isSelected}
                onChange={() => {
                  setSelectedSimpleSizes((currentSizes) => {
                    if (currentSizes.includes(size)) {
                      return currentSizes.filter(
                        (currentSize) => currentSize !== size
                      );
                    }

                    return [...currentSizes, size];
                  });
                }}
              />

              <span>{size}</span>
            </label>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 mt-5">
        <Button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancelar
        </Button>

        <Button
          onClick={onAccept}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Aceptar
        </Button>
      </div>
    </div>
  )
}

export default SimpleSizes;