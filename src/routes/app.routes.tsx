import { Route, Routes } from "react-router-dom";
import { Home } from "@pages/Home";
import { SignIn } from "@pages/SignIn";
import { SignUp } from "@pages/SignUp";
import { UserRoute } from "./User";

export function AppRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserRoute>
            <Home />
          </UserRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
