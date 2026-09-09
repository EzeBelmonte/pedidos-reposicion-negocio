import { Link } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { Button } from "@/components";
import { useOrders } from "@/app/hooks/useOrders";
import OrderPendingCard from "../components/OrderPendingCard";

const Pending = () => {
  const {
    orders,
  } = useOrders();

  return (
    <section className="w-full flex flex-col items-center px-1 py-10 mt-10">
      <h2 className="w-[300px] bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded">
        Pedidos pendientes
      </h2>

      <Link to="/">
        <Button className="absolute top-2 left-2 font-semiboldpx-2 py-1 rounded font-semibold">
          <CircleChevronLeft size={30} />
        </Button>
      </Link>

      {orders
        .filter((order) => order.status === "pending")
        .map((order) => (
          <OrderPendingCard 
            key={order.id} 
            order={order} 
          />
        ))
      }

    </section>
  );
}

export default Pending;