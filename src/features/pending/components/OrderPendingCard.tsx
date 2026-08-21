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
  const {
    removeOrder,
    updateOrderStatus,
  } = useOrders();

  return (
    <article className="
      w-full max-w-[600px] 
      flex justify-between items-center
      px-5 py-2 my-1
      rounded
      bg-amber-400
      border border-black/40
    ">
      <div className="space-y-1">
        <p>Proveedor: <span className="font-semibold">{order.title}</span></p>
        <p>Pedido creado: <span className="font-semibold">{formatNormalDate(order.createdAt)}</span></p>
      </div>

      <div className="flex gap-3 font-semibold">
        <Button
          onClick={() => updateOrderStatus(order.id, "done")}
          className="
            bg-white
            px-2 py-1
            rounded
          "
        >
          Realizado
        </Button>

        <Button
          onClick={() => removeOrder(order.id)}
          className="
            bg-black
            text-white
            px-2 py-1
            rounded
          "
        >
          Eliminar
        </Button>
      </div>

    </article>
  );
}

export default OrderPendingCard;