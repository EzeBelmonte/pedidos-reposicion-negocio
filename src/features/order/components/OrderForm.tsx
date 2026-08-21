import { useEffect, useRef, useState } from "react";
import { CirclePlus } from "lucide-react";

import type { OrderItem, OrderList } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";

import OrderProductCard from "../components/OrderProductCard";

import { cn } from "@/utils/cn";

import { Button, Input } from "@/components";

type Props = {
  order?: OrderList;
  onSave: (order: OrderList) => void; 
}

const OrderForm = ({
  order,
  onSave,
}: Props) => {
  const [items, setItems] = useState<OrderItem[]>(
   order?.items ?? []
  );
  const [title, setTitle] = useState(
    order?.title ?? ""
  );
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Agregar producto
  const handleAddProduct = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        productId: null,
        quantities: {},
      },
    ]);
  }

  // Cambiar producto
  const handleChangeProduct = (
    index: number,
    productId: number | null
  ) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) => 
        itemIndex === index
          ? {
              ...item,
              productId,
            }
          : item
      )
    );
  }

  // Cantidad de calzados para cada número
  const handleChangeQuantity = (
    index: number,
    size: ShoeSize,
    quantity: number
  ) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        return {
          ...item,
          quantities: {
            ...item.quantities,
            [size]: quantity,
          },
        };
      }),
    );
  }
  
  // Eliminar un producto de la orden
  const handleRemoveProduct = (index: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  // Guardar la order
  const handleSaveOrder = () => {
    if (items.length === 0) {
      return;
    }

    const now = new Date().toISOString();

    const orderToSave: OrderList = {
      id: order?.id ?? Date.now(),
      title: title.trim() || undefined,
      status: order?.status ?? "pending",
      items,
      createdAt: order?.createdAt ?? now,
      updatedAt: now,
    }

    onSave(orderToSave);
    setItems([]);
    setTitle("");
  }

  // Scroll hacia la nueva card
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [items.length]);
  
  return (
    <div className="w-full max-w-[600px] flex flex-col items-center">
      <Input
        type="text"
        placeholder="Título del pedido (opcional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-[300px]"
      />

      <Button
        onClick={handleAddProduct}
        className="
          bg-blue-500
          text-white font-semibold 
          p-2 rounded-2xl
          fixed
          bottom-5 right-5"
      >
        <CirclePlus size={30} />
      </Button>

      {items.map((item, index) => (
        <OrderProductCard 
          key={index} 
          item={item}
          onChangeProduct={(productId) =>
            handleChangeProduct(index, productId)
          }
          onChangeQuantity={(size, quantity) =>
            handleChangeQuantity(index, size, quantity)
          }
          onRemove={() => handleRemoveProduct(index)}
        />

      ))}

      <Button
        onClick={handleSaveOrder}
        disabled={items.length === 0}
        className={cn(`
          font-semibold
          px-2 py-1 mt-5
          rounded text-white`,
          items.length > 0 
            ? "bg-green-600 cursor-pointer"
            : "bg-gray-500"
        )}
      >
        Guardar pedido
      </Button>
      
      <div ref={bottomRef} />
    </div>
  );
}

export default OrderForm;