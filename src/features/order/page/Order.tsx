import { useEffect, useRef, useState } from "react";
import { CirclePlus } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";
import { Button, Input, AlertError } from "@/components";
import OrderProductCard from "../components/OrderProductCard";
import { cn } from "@/utils/cn";

const Order = () => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [title, setTitle] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    addOrder,
    error,
  } = useOrders();

  if (error) {
    return <AlertError error={"ERROR"} />;
  }

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [items.length]);

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

    const order = {
      id: Date.now(),
      title: title.trim() || undefined,
      items,
      createdAt: now,
      updatedAt: now,
    }

    addOrder(order);

    setItems([]);
    setTitle("");
  }

  return (

    <section className="flex flex-col items-center px-5 py-10">
      <h1 className="bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded">
        Armar pedido
      </h1>

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
          text-white text-[1.1rem] font-semibold 
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
          text-[1.1rem] font-semibold
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
    </section>
  );
}

export default Order;