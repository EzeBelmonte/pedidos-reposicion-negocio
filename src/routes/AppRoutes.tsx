import { Routes, Route } from "react-router-dom";

import { Aplication } from "@/pages/Aplication";
import { Products } from "@/features";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Aplication />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
