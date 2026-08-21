import React, { useState, useEffect } from "react";
import type { Product } from "@/types";
import { 
  Button,
  Input,
} from "@/components";
import { cn } from "@/utils/cn";


type Props = {
  product?: Product;
  onAdd: (brand: string, article: string) => void;
  onEdit: (id: number, brand: string, article: string) => void;
  onCancel: () => void;
}

export const ProductForm = ({ 
  product,
  onAdd,
  onEdit,
  onCancel,
}: Props) => {
  const [brand, setBrand] = useState("");
  const [article, setArticle] = useState("");

  useEffect(() => {
    if (product) {
      setBrand(product.brand);
      setArticle(product.article);
    } else {
      setBrand("");
      setArticle("");
    }
  }, [product]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!brand.trim() || !article.trim()) {
      return;
    }

    if (product) {
      onEdit(product.id, brand.trim(), article.trim());
    } else {
      onAdd(brand.trim(), article.trim());
    }

    setBrand("");
    setArticle("");
  }

  const button = "font-semibold px-3 py-1 rounded";

  return (
    <form 
      onSubmit={handleSubmit} 
      className="
        w-full
        flex flex-col 
        items-center 
        border border-black 
        bg-[#2b6de7] 
        p-5 rounded 
        font-semibold"
    >
      <div className="w-full flex flex-col gap-5 mb-5">
        <Input 
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Marca"
          className="bg-white"
        />

        <Input 
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Artículo"
          className="bg-white"
        />
      </div>

      <div className={cn(
        product && "flex items-center gap-3"
      )}>
        <Button 
          type="submit"
          className={cn("bg-[#ffffff] text-black px-2", button)}
        >
          {product
            ? "Guardar cambios"
            : "Agregar producto"
          }
        </Button>

        {product && (
          <Button
            type="button"
            onClick={onCancel}
            className={cn("bg-[#222222] text-white", button)}
          >
            Cancelar
          </Button>
        )}
        </div>
    </form>
  );
}