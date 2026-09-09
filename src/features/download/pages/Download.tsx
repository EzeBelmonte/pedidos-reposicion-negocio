import { NativeDownload } from "@/features/download/services/nativeDownload";
import { useOrders } from "@/app/hooks/useOrders";
import { productsStorage } from "@/storage/productsStorage";
import { generateOrdersCsv } from "@/features/download/services/orders.csv";

import { Button } from "@/components";

const Download = () => {
  const { orders } = useOrders();

  const handleDownload = async () => {
  try {
    console.log("1. Botón presionado");

    const products = await productsStorage.get();

    console.log("2. Productos obtenidos:", products);

    const csv = generateOrdersCsv(
      orders,
      products
    );

    console.log("3. CSV generado:", csv);

    const result = await NativeDownload.saveToDownloads({
      fileName: "pedidos-realizados.csv",
      data: csv,
    });

    console.log(
      "4. ARCHIVO GUARDADO:",
      result
    );

  } catch (error) {
    console.error(
      "ERROR AL DESCARGAR:",
      error
    );
  }
}

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Descargar Historial</h1>

      <p>Descargá el historial de pedidos en formato CSV</p>

      <Button 
        onClick={handleDownload}
        className="
          mt-4 
          bg-green-600 hover:bg-green-700 
          text-white font-semibold text-[1.1rem] px-4 py-1 rounded"
      >
        Generar CSV
      </Button>
    </section>
  );
} 

export default Download;