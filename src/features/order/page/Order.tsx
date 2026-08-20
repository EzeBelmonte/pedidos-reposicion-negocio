import { useState } from "react";
import { CirclePlus } from "lucide-react";
import type { OrderItem } from "@/types/order.type";
import type { ShoeSize } from "@/types/shoes.type";
import { Button } from "@/components";
import OrderProductCard from "../components/OrderProductCard";

const Order = () => {
  const [items, setItems] = useState<OrderItem[]>([]);


  const handleAddProduct = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        productId: null,
        quantities: {},
      },
    ]);
  }

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
  
  const handleRemoveProduct = (index: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  return (
    <section className="flex flex-col items-center px-5">
      <h1 className="bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded mt-5">
        Armar pedido
      </h1>

      <Button
        onClick={handleAddProduct}
        className="
          bg-green-700 
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

    </section>
  );
}

export default Order;