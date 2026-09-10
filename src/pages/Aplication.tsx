import { Link } from "react-router-dom";
import { PackagePlus, Package, List, FileClock, Download } from "lucide-react";

import { Button } from "@/components";

import { cn } from "@/utils/cn";

export const Aplication = () => {

  const button = "w-[250px] text-[1.7rem] font-semibold py-1 rounded px-5 text-white border border-black/50";
  const icon = "absolute -left-4 z-10 rounded-2xl text-black p-3 bg-white border border-black/50";

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">

      <h1 className="bg-gray-600 px-5 py-1 text-white text-[2.3rem] font-bold mb-[25px] rounded">
        Menú principal
      </h1>

      <div className="flex flex-col gap-6">
        <Link to="/create" className="relative flex items-center">
          <PackagePlus
            size={60}
            className={icon}
          />

          <Button
            className={cn(
              "bg-blue-600",
              button,
              "pr-20" // espacio para que el texto no quede debajo del ícono
            )}
          >
            Crear
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
            "pl-5"// espacio para que el texto no quede debajo del ícono
          )}>
            Productos
          </Button>
        </Link>

        <Link to="/pending" className="relative flex items-center">
          <Package
            size={60}
            className={icon}
          />

          <Button className={cn(
            "bg-cyan-700",
            button,
            "pl-7"// espacio para que el texto no quede debajo del ícono
          )}>
            Pendientes
          </Button>
        </Link>

        <Link to="/historial" className="relative flex items-center">
          <FileClock
            size={60}
            className={icon}
          />

          <Button className={cn(
            "bg-violet-600",
            button,
            "pr-11"
          )}>
            Historial
          </Button>
        </Link>

        <Link to="/download" className="relative flex items-center">
          <Download
            size={60}
            className={icon}
          />

          <Button className={cn(
            "bg-green-600",
            button,
            "pr-6"
          )}>
            Descargar
          </Button>
        </Link>
      </div>
    </main>
  );
};
