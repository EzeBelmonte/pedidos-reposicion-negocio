import { useState } from "react";

import type { ShoeSize } from "@/types/shoes.type";
import type { ShoeQuantities } from "@/types/shoes.type";
import { compoundShoeSizes } from "@/data/shoeSizes";

type Props = {
  item: ShoeQuantities;
}

export function useCompositeSizes({ item }: Props) {
  const existingCompositeSizes = compoundShoeSizes.filter(
    (size) => item[size] !== undefined
  );

  const [isCompositeSizeModalOpen, setIsCompositeSizeModalOpen] =
    useState(false);

  const [selectedCompositeSizes, setSelectedCompositeSizes] =
    useState<ShoeSize[]>(existingCompositeSizes);

  const [compositeSizes, setCompositeSizes] =
    useState<ShoeSize[]>(existingCompositeSizes);

  
  const handleOpenCompositeModal = () => {
    setSelectedCompositeSizes(compositeSizes);
    setIsCompositeSizeModalOpen(true);
  };

  const handleCloseCompositeModal = () => {
    setIsCompositeSizeModalOpen(false);
  };

  const handleAcceptCompositeSizes = () => {
    setCompositeSizes(selectedCompositeSizes);
    setIsCompositeSizeModalOpen(false);
  };

  return {
    // Estados
    isCompositeSizeModalOpen,
    selectedCompositeSizes,
    compositeSizes,

    // Acciones
    setSelectedCompositeSizes,
    setCompositeSizes,
    handleOpenCompositeModal,
    handleCloseCompositeModal,
    handleAcceptCompositeSizes,
  };
}