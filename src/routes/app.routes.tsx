import { Route, Routes } from "react-router-dom";
import { Home } from "@pages/Home";

export function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
