import { Link } from "react-router-dom";
import { PackagePlus, List } from "lucide-react";

import { Button } from "@/components";

import { cn } from "@/utils/cn";

export const Aplication = () => {

  const button = "w-[270px] text-[1.7rem] font-semibold py-2 rounded-full px-5";
  const icon = "absolute left-0 z-10 rounded-full bg-white p-2 text-black";

  return (
    <main className="w-full h-screen flex flex-col text-white items-center justify-center">
      <h1 className="text-[3rem] font-bold mb-[25px]">Menú principal</h1>

      <div className="flex flex-col items-center gap-4">
        <Link to="" className="relative flex items-center">
          <PackagePlus
            size={60}
            className={icon}
          />

          <Button
            className={cn(
              "bg-blue-600",
              button,
              "pl-20" // espacio para que el texto no quede debajo del ícono
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
            "pl-10" // espacio para que el texto no quede debajo del ícono
          )}>
            Productos
          </Button>
        </Link>
      </div>
    </main>
  );
};
