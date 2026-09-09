import type { OrderList } from "@/types/order.type";

import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { useOrders } from "@/app/hooks/useOrders";
import { Button } from "@/components";

type Props = {
  order: OrderList;
}

const HistorialCard = ({ 
  order,
}: Props) => {
  const {
    removeOrder,
  } = useOrders();
  
  console.log(order);
  
  return (
    <article className="
      w-full
      flex justify-between items-center
      px-2 py-2 my-1
      rounded
      bg-amber-400
      border border-black/40
    ">
      <div className="space-y-1">
        <p>Proveedor: <span className="font-semibold">{order.title}</span></p>
        <p>Pedido creado: <span className="font-semibold">{formatNormalDate(order.createdAt)}</span></p>
      </div>

      <Button
        onClick={() => removeOrder(order.id)}
        className="
          flex gap-3 font-semibold
          bg-black
          text-white
          px-2 py-1
          rounded
        "
      >
        Eliminar
      </Button>

    </article>
  );
}

export default HistorialCard;