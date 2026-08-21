import { Routes, Route } from "react-router-dom";

import { Aplication } from "@/pages/Aplication";
import { 
  Order,
  Products,
  Pending,
  Historial
} from "@/features";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Aplication />} />
      <Route path="/order" element={<Order />} />
      <Route path="/products" element={<Products />} />
      <Route path="/pending" element={<Pending />} />
      <Route path="/historial" element={<Historial />} />
    </Routes>
  );
}
