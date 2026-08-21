import { Link } from "react-router-dom";
import {  CircleChevronLeft } from "lucide-react";
import { useOrders } from "@/app/hooks/useOrders";

import { Button, AlertError } from "@/components";
import type { OrderList } from "@/types/order.type";
import OrderForm from "../components/OrderForm";


const Order = () => {
  const {
    addOrder,
    error,
  } = useOrders();

  const handleSave = (order: OrderList) => {
    addOrder(order);
  }

  if (error) {
    return <AlertError error={error} />
  }

  return (

    <section className="flex flex-col items-center px-5 py-10">
      <Link to="/">
        <Button className="absolute top-2 left-2 font-semiboldpx-2 py-1 rounded font-semibold">
          <CircleChevronLeft size={30} />
        </Button>
      </Link>

      <h1 className="w-[300px] bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded">
        Armar pedido
      </h1>

      <OrderForm 
        onSave={handleSave}
      />
    </section>
  );
}

export default Order;