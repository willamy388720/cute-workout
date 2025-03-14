import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "@pages/Home";
import { SignIn } from "@pages/SignIn";
import { SignUp } from "@pages/SignUp";
import { UserRoute } from "./User";
import { UserLayout } from "./UserLayout";
import { Profile } from "@pages/Profile";
import { WorkoutLayout } from "./WorkoutLayout";
import { CreateManualWorkout } from "@pages/CreateManualWorkout";

export function AppRoute() {
  return (
    <Routes>
      <Route index element={<Navigate to={"/treino"} />} />

      <Route
        path="/"
        element={
          <UserRoute>
            <UserLayout />
          </UserRoute>
        }
      >
        <Route path="/treino" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/medidas" element={<></>} />
      </Route>

      <Route
        path="/"
        element={
          <UserRoute>
            <WorkoutLayout />
          </UserRoute>
        }
      >
        <Route path="/treino/criar" element={<CreateManualWorkout />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
