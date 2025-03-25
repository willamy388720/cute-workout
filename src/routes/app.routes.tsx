import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "@pages/Home";
import { SignIn } from "@pages/SignIn";
import { SignUp } from "@pages/SignUp";
import { UserRoute } from "./User";
import { UserLayout } from "./UserLayout";
import { Profile } from "@pages/Profile";
import { WorkoutLayout } from "./WorkoutLayout";
import { CreateManualWorkout } from "@pages/CreateManualWorkout";
import { NotFound } from "@pages/NotFound";
import { MyStudents } from "@pages/MyStudents";
import { Notifications } from "@pages/Notifications";

export function AppRoute() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

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
        <Route path="/alunos" element={<MyStudents />} />
        <Route path="/notificacoes" element={<Notifications />} />
      </Route>

      <Route
        path="/"
        element={
          <UserRoute>
            <WorkoutLayout />
          </UserRoute>
        }
      >
        <Route path="/treino/criar/:id" element={<CreateManualWorkout />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
