import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MenuProductos } from "../MenuProductos";
import { ListAllProducts } from "../ListAllProducts";
import { Perfil } from "../Perfil";
import { RegistrProvider } from "../RegistrProvider";
import { UseContex } from "../../context/UseContex";
import { Error404 } from "../Error404";
import { RegisterProduct } from "../RegisterProduct";
import { FlowerCart } from "../FlowerCart";
import { MenuAnuncio } from "../MenuAnuncio";

export const AppRouter = () => {
  const { dataUser } = useContext(UseContex);

  return (
    <Routes>
      {/* Rutas protegidas según el rol del usuario */}
      {/* Si el usuario es un CLIENTE, muestra las rutas de MenuProductos, ListAllProducts, MenuAnuncio y FlowerCart */}
      {/* Si el usuario es un ADMINISTRADOR, muestra las rutas de Perfil, RegistrProvider y RegisterProduct */}
      {/* Si el usuario no tiene un rol válido, se redirige a la página de Error404 */}
      {/* Ruta principal que muestra MenuProductos si el usuario es un CLIENTE, o redirige a Perfil si es un ADMINISTRADOR */}{" "}
      <Route
        path="/"
        element={
          dataUser?.DsRol === "CLIENTE" ? (
            <MenuProductos />
          ) : (
            <Navigate to={"/perfil"} />
          )
        }
      />
      {/* Ruta que muestra ListAllProducts si el usuario es un CLIENTE, o redirige a Perfil si es un ADMINISTRADOR */}
      <Route
        path="/listProducts"
        element={
          dataUser?.DsRol === "CLIENTE" ? (
            <ListAllProducts />
          ) : (
            <Navigate to={"/perfil"} />
          )
        }
      />
      {/* Ruta que muestra MenuAnuncio si el usuario es un CLIENTE, o redirige a Perfil si es un ADMINISTRADOR */}
      <Route
        path="/MenuAnuncio"
        element={
          dataUser?.DsRol === "CLIENTE" ? (
            <MenuAnuncio />
          ) : (
            <Navigate to={"/perfil"} />
          )
        }
      />
      {/* Ruta que muestra FlowerCart si el usuario es un CLIENTE, o redirige a Perfil si es un ADMINISTRADOR */}
      <Route
        path="/flowerCart"
        element={
          dataUser?.DsRol === "CLIENTE" ? (
            <FlowerCart />
          ) : (
            <Navigate to={"/perfil"} />
          )
        }
      />
      {/* Ruta que muestra Perfil si el usuario es un ADMINISTRADOR */}
      <Route path="/perfil" element={<Perfil />} />
      {/* Ruta que muestra RegistrProvider si el usuario es un ADMINISTRADOR, o redirige a Error404 si no tiene el rol adecuado */}
      <Route
        path="/registerProvider"
        element={
          dataUser?.DsRol === "ADMINISTRADOR" ? (
            <RegistrProvider />
          ) : (
            <Navigate to={"/Error404"} />
          )
        }
      />
      {/* Ruta que muestra RegisterProduct si el usuario es un ADMINISTRADOR, o redirige a Error404 si no tiene el rol adecuado */}
      <Route
        path="/registerProduct"
        element={
          dataUser?.DsRol === "ADMINISTRADOR" ? (
            <RegisterProduct />
          ) : (
            <Navigate to={"/Error404"} />
          )
        }
      />
      <Route path="/Error404" element={<Error404 />} />
    </Routes>
  );
};
