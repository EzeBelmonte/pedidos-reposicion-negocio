import { useState } from "react";

import type { ShoeSize } from "@/types/shoes.type";
import type { ShoeQuantities } from "@/types/shoes.type";
import { simpleShoeSizes } from "@/data/shoeSizes";

type Props = {
  item: ShoeQuantities;
}

export function useSimpleSizes({ item }: Props) {
  const existingSimpleSizes = simpleShoeSizes.filter(
    (size) => item[size] !== undefined
  );

  const [isSimpleSizeModalOpen, setIsSimpleSizeModalOpen] =
    useState(false);

  const [selectedSimpleSizes, setSelectedSimpleSizes] =
    useState<ShoeSize[]>(existingSimpleSizes);

  const [simpleSizes, setSimpleSizes] =
    useState<ShoeSize[]>(existingSimpleSizes);


  const handleOpenSimpleModal = () => {
    setSelectedSimpleSizes(simpleSizes);
    setIsSimpleSizeModalOpen(true);
  };

  const handleCloseSimpleModal = () => {
    setIsSimpleSizeModalOpen(false);
  };

  const handleAcceptSimpleSizes = () => {
    setSimpleSizes(selectedSimpleSizes);
    setIsSimpleSizeModalOpen(false);
  };

  return {
    // Estados
    isSimpleSizeModalOpen,
    selectedSimpleSizes,
    simpleSizes,

    // Acciones
    setSelectedSimpleSizes,
    setSimpleSizes,
    handleOpenSimpleModal,
    handleCloseSimpleModal,
    handleAcceptSimpleSizes,
  };
}