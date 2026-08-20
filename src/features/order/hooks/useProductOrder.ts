import { useState } from "react";

import type { ShoeSize } from "@/types/shoes.type";

export function useProductOrder() {
  const [isSimpleSizeModalOpen, setIsSimpleSizeModalOpen] = useState(false);
  const [selectedSimpleSizes, setSelectedSimpleSizes] = useState<ShoeSize[]>([]);
  const [simpleSizes, setSimpleSizes] = useState<ShoeSize[]>([]);

  const [isCompositeSizeModalOpen, setIsCompositeSizeModalOpen] = useState(false);
  const [selectedCompositeSizes, setSelectedCompositeSizes] = useState<ShoeSize[]>([]);
  const [compositeSizes, setCompositeSizes] = useState<ShoeSize[]>([]);

  // Abrir Modal simple
  const handleOpenSimpleModal = () => {
    setSelectedSimpleSizes(simpleSizes);
    setIsSimpleSizeModalOpen(true)
  }

  // Cerrar Modal simple
  const handleCloseSimpleModal = () => {
    setIsSimpleSizeModalOpen(false);
  }

  // Función para aceptar los números simples seleccionados
  const handleAcceptSimpleSizes = () => {
    setSimpleSizes(selectedSimpleSizes);
    setIsSimpleSizeModalOpen(false);
  };


  // Abrir Modal compuesto
  const handleOpenCompositeModal = () => {
    setSelectedCompositeSizes(simpleSizes);
    setIsCompositeSizeModalOpen(true)
  }

  // Cerrar Modal compuesto
  const handleCloseCompositeModal = () => {
    setIsCompositeSizeModalOpen(false);
  }

  // Función para aceptar los números compuestos seleccionados
  const handleAcceptCompositeSizes = () => {
    setCompositeSizes(selectedSimpleSizes);
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
  }
}