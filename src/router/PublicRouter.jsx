import { useContext, useEffect } from "react";
import { UseContex } from "../context/UseContex";
import { useNavigate } from "react-router-dom";

// Definir el componente 'PublicRouter' que se utiliza para proteger rutas públicas
export const PublicRouter = ({ children }) => {
  // Obtener la función 'navigate' para realizar redirecciones de navegación
  const navigate = useNavigate();
  // Utilizar el hook 'useContext' para acceder al contexto 'UseContex' y obtener el valor de 'logged' y 'validToken'
  const { logged, validToken } = useContext(UseContex);

  // Utilizar el hook 'useEffect' para ejecutar una acción al montar el componente
  useEffect(() => {
    // Obtener el token del almacenamiento local (localStorage)
    const token = localStorage.getItem("token");

    // Verificar si existe un token almacenado en el localStorage
    if (token) {
      // Si hay un token, llamar a la función 'validToken' del contexto para validar el token
      validToken(token);
    }
  }, []); // El segundo argumento del useEffect es un arreglo vacío, lo que indica que la función se ejecutará solo una vez al montar el componente

  // Utilizar el hook 'useEffect' para ejecutar una acción al montar el componente
  useEffect(() => {
    // Verificar si el usuario está autenticado (si 'logged' es true)
    if (logged) {
      // Si el usuario está autenticado, redirigirlo a la página de inicio ('/')
      navigate("/");
      return; // La instrucción 'return' se utiliza para salir de la función después de la redirección
    }
  }, []); // El segundo argumento del useEffect es un arreglo vacío, lo que indica que la función se ejecutará solo una vez al montar el componente

  // Devolver el contenido de los componentes hijos pasados como prop ('children')
  return children;
};
