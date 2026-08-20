import { Link } from "react-router-dom";
import { PackagePlus, List } from "lucide-react";

import { Button } from "@/components";

import { cn } from "@/utils/cn";

export const Aplication = () => {

  const button = "w-[250px] text-[1.7rem] font-semibold py-1 rounded px-5 text-white border border-black/50";
  const icon = "absolute -left-4 z-10 rounded-2xl text-black p-3 bg-white border border-black/50";

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">

      <h1 className="bg-gray-600 px-5 py-1 text-white text-[3rem] font-bold mb-[25px] rounded">
        Menú principal
      </h1>

      <div className="flex flex-col items-center gap-4">
        <Link to="/order" className="relative flex items-center">
          <PackagePlus
            size={60}
            className={icon}
          />

          <Button
            className={cn(
              "bg-blue-600",
              button,
              "pl-14" // espacio para que el texto no quede debajo del ícono
            )}
          >
            <span className="mx-auto">Crear pedido</span>
          </Button>
        </Link>

        <Link to="/products" className="relative flex items-center">
          <List
            size={60}
            className={icon}
          />

          <Button className={cn(
            "bg-amber-600",
            button,
            "pl-5" // espacio para que el texto no quede debajo del ícono
          )}>
            Productos
          </Button>
        </Link>
      </div>
    </main>
  );
};
