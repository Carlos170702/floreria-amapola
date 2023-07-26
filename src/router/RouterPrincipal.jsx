// importa los componentes ya sean propios o usando la libreria de react-router-dom
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { Register } from "../pages/auth/Register";
import { AppRouter } from "../pages/router/AppRouter";
import { ResetPassword } from "../pages/auth/ResetPassword";

// Definir el componente 'RouterPrincipal'
export const RouterPrincipal = () => {
  // Renderizar las rutas usando el componente 'Routes'
  return (
    <Routes>
      {/* Definir una ruta para '/login' que utiliza el componente 'PublicRouter' */}
      <Route
        path="/login"
        element={
          <PublicRouter>
            <Login />
          </PublicRouter>
        }
      />
      {/* Definir una ruta para '/register' que utiliza el componente 'PublicRouter' */}
      <Route
        path="/register"
        element={
          <PublicRouter>
            <Register />
          </PublicRouter>
        }
      />

      {/* Definir una ruta para '/forgetPassword' que utiliza el componente 'PublicRouter' */}
      <Route
        path="/forgetPassword"
        element={
          <PublicRouter>
            <ResetPassword />
          </PublicRouter>
        }
      />

      {/* Definir una ruta para cualquier otra URL que utiliza el componente 'PrivateRouter' */}
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
