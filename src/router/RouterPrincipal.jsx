import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { Register } from "../pages/auth/Register";
import { AppRouter } from "../pages/router/AppRouter";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { RegisterProduct } from "../pages/RegisterProduct";

export const RouterPrincipal = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRouter>
            <Login />
          </PublicRouter>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRouter>
            <Register />
          </PublicRouter>
        }
      />

      <Route
        path="/forgetPassword"
        element={
          <PublicRouter>
            <ResetPassword />
          </PublicRouter>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRouter>
            <AppRouter />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};
