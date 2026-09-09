import { Link } from "react-router-dom";
import { CircleChevronLeft } from "lucide-react";
import { useOrders } from "@/app/hooks/useOrders";
import { productsStorage } from "@/storage/products.storage";
import { generateOrdersXlsx } from "@/features/download/services/orders.xlsx";
import { NativeDownload } from "@/features/download/services/nativeDownload";
import { Button } from "@/components";

const uint8ArrayToBase64 = (
  bytes: Uint8Array
): string => {
  let binary = "";

  const chunkSize = 0x8000;

  for (
    let i = 0;
    i < bytes.length;
    i += chunkSize
  ) {
    const chunk = bytes.subarray(
      i,
      Math.min(i + chunkSize, bytes.length)
    );

    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
};

const Download = () => {
  const { orders } = useOrders();

  const handleDownload = async () => {
    try {
      console.log("1. Botón presionado");

      const products =
        await productsStorage.get();

      console.log(
        "2. Productos obtenidos:",
        products
      );

      const xlsxData =
        generateOrdersXlsx(
          orders,
          products
        );

      console.log(
        "3. Excel generado:",
        xlsxData.length,
        "bytes"
      );

      const base64 =
        uint8ArrayToBase64(xlsxData);

      console.log(
        "4. Excel convertido a Base64"
      );

      const result =
        await NativeDownload.saveToDownloads({
          fileName:
            "pedidos-realizados.xlsx",
          data: base64,
        });

      console.log(
        "5. ARCHIVO GUARDADO:",
        result
      );

    } catch (error) {
      console.error(
        "ERROR AL DESCARGAR:",
        error
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <Link to="/">
        <Button className="absolute top-2 left-2 font-semiboldpx-2 py-1 rounded font-semibold">
          <CircleChevronLeft size={30} />
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">
        Descargar Historial
      </h1>

      <p className="text-center">
        Guardá el historial de pedidos
        en formato Excel
      </p>

      <Button
        onClick={handleDownload}
        className="
          mt-4
          bg-green-600 hover:bg-green-700
          text-white font-semibold text-[1.1rem]
          px-4 py-1 rounded
        "
      >
        Descargar Historial
      </Button>
    </section>
  );
};

export default Download;