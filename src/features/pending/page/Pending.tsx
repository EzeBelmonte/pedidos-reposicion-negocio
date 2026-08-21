import { Link } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { Button } from "@/components";
import { useOrders } from "@/features/order/hooks/useOrders";
import OrderPendingCard from "../components/OrderPendingCard";

const Pending = () => {
  const {
    orders,
    removeOrder,
    updateOrderStatus,
  } = useOrders();

  return (
    <section className="w-full flex flex-col items-center px-5 py-10 mt-10">
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
            updateOrderStatus={updateOrderStatus}
            removeOrder={removeOrder}
          />
        ))
      }

    </section>
  );
}

export default Pending;