import { CircleChevronLeft } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrders } from "@/app/hooks/useOrders";

import { 
  Alert,
  Button,
} from "@/components";
import OrderForm from "../components/OrderForm";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    editOrder,
    orderById,
  } = useOrders();

  const orderId = Number(id);

  const order = orderById(orderId);

  if (!order) {
    return <Alert message={"Pedido no encontrado."} />
  }

  return (
    <section className="flex flex-col items-center px-1 p-5 mt-12">
      <Link to="/">
        <Button className="absolute top-2 left-2 font-semiboldpx-2 py-1 rounded font-semibold">
          <CircleChevronLeft size={30} />
        </Button>
      </Link>

      <h1 className="w-[300px] bg-gray-600 px-5 py-1 text-white text-[1.7rem] font-bold mb-[25px] rounded">
        Editar pedido
      </h1>

      <OrderForm 
        order={order}
        onSave={(updatedOrder) => {
          editOrder(updatedOrder);
          navigate("/pending");
        }}
      />

    </section>
  );
}

export default EditOrder;