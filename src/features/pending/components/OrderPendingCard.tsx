import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import type { OrderList } from "@/types/order.type";
import { useOrders } from "@/app/hooks/useOrders";
import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { Button } from "@/components";

type Props = {
  order: OrderList;
}

const OrderPendingCard = ({ 
  order,
}: Props) => {
  const navigate = useNavigate();

  const {
    removeOrder,
    updateOrderStatus,
  } = useOrders();

  console.log(order);
  return (
    <article className="
      w-full
      flex flex-col
      px-2 py-2 my-1
      rounded
      bg-amber-400
      border border-black/40
    ">
      <div className="flex justify-between">
        <div className="space-y-1">
          <p>Proveedor: <span className="font-semibold">{order.title}</span></p>
          <p>Pedido creado: <span className="font-semibold">{formatNormalDate(order.createdAt)}</span></p>
        </div>

        <div className="flex flex-col gap-3 font-semibold">
          <Button
            onClick={() => navigate(`/${order.id}`)}
            className="
              bg-black
              text-white
              p-1
              rounded
            "
          >
            <Edit size={20} />
          </Button>

          <Button
            onClick={() => removeOrder(order.id)}
            className="
              bg-white
              text-red-600
              p-1
              rounded
            "
          >
            <Trash size={20}/>
          </Button>
        </div>
      </div>

      <Button
        onClick={() => updateOrderStatus(order.id, "done")}
        className="
          mt-3
          bg-white
          px-2 py-1
          rounded
        "
      >
        Realizado
      </Button>
    </article>
  );
}

export default OrderPendingCard;