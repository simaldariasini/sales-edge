import { Route, Routes } from "react-router-dom";
import System from "../pages/System/System";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<System />} />
    </Routes>
  );
}
