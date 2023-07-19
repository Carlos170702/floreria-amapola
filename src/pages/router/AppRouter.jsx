import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MenuProductos } from "../MenuProductos";
import { ListAllProducts } from "../ListAllProducts";
import { Perfil } from "../Perfil";
import { RegistrProvider } from "../RegistrProvider";
import { UseContex } from "../../context/UseContex";
import { Error404 } from "../Error404";
import { RegisterProduct } from "../RegisterProduct";
import { MenuAnuncios } from "../MenuAnuncios";

export const AppRouter = () => {
  const { dataUser } = useContext(UseContex);

  return (
    <Routes>
      <Route path="/" element={dataUser?.DsRol === 'CLIENTE' ? <MenuProductos /> : <Navigate to={'/perfil'} />} />
      <Route path="/listProducts" element={dataUser?.DsRol === 'CLIENTE' ? <ListAllProducts /> : <Navigate to={'/perfil'} />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/registerProvider" element={dataUser?.DsRol === 'ADMINISTRADOR' ?<RegistrProvider /> : <Navigate to={'/Error404'} />} />
      <Route path="/registerProduct" element={dataUser?.DsRol === 'ADMINISTRADOR' ?<RegisterProduct /> : <Navigate to={'/Error404'} />}/>
      <Route path="/Error404" element={<Error404 />} />
      <Route path="/Anuncios" element={<MenuAnuncios />} />
    </Routes>
  );
};
