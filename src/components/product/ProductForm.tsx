import React, { useState, useEffect } from "react";
import type { Product } from "@/types";
import { 
  Button,
  Input,
} from "@/components";


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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Marca
          <Input 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Artículo
          <Input 
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </label>
      </div>

      <Button type="submit">
        {product
          ? "Guardar cambios"
          : "Agregar producto"
        }
      </Button>

      {product && (
        <Button
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      )}
    </form>
  );
}