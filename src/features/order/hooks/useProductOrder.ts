import { useState } from "react";

import type { ShoeSize } from "@/types/shoes.type";

export function useProductOrder() {
  // =========================
  // Números simples
  // =========================

  const [isSimpleSizeModalOpen, setIsSimpleSizeModalOpen] =
    useState(false);

  const [selectedSimpleSizes, setSelectedSimpleSizes] =
    useState<ShoeSize[]>([]);

  const [simpleSizes, setSimpleSizes] =
    useState<ShoeSize[]>([]);

  // =========================
  // Números compuestos
  // =========================

  const [isCompositeSizeModalOpen, setIsCompositeSizeModalOpen] =
    useState(false);

  const [selectedCompositeSizes, setSelectedCompositeSizes] =
    useState<ShoeSize[]>([]);

  const [compositeSizes, setCompositeSizes] =
    useState<ShoeSize[]>([]);

  // =========================
  // Simples
  // =========================

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

  // =========================
  // Compuestos
  // =========================

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
    isSimpleSizeModalOpen,
    selectedSimpleSizes,
    simpleSizes,

    isCompositeSizeModalOpen,
    selectedCompositeSizes,
    compositeSizes,

    // Acciones
    setSelectedSimpleSizes,
    setSimpleSizes,
    handleOpenSimpleModal,
    handleCloseSimpleModal,
    handleAcceptSimpleSizes,

    setSelectedCompositeSizes,
    setCompositeSizes,
    handleOpenCompositeModal,
    handleCloseCompositeModal,
    handleAcceptCompositeSizes,
  };
}