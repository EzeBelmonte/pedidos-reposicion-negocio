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

  return (
    <form onSubmit={handleSubmit} className="w-[500px] flex flex-col items-center border border-white p-5 rounded">
      <div className="w-full flex flex-col gap-5 mb-5">
        <Input 
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Marca"
          className="text-[1.1rem]"
        />

        <Input 
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Artículo"
          className="text-[1.1rem]"
        />
      </div>

      <div className={cn(
        product && "flex items-center gap-3"
      )}>
        <Button 
          type="submit"
          className="bg-green-700 text-[1.2rem] font-semibold px-3 py-1 rounded"
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
            className="bg-red-700 text-[1.2rem] font-semibold px-3 py-1 rounded"
          >
            Cancelar
          </Button>
        )}
        </div>
    </form>
  );
}