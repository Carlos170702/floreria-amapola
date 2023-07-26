// Importar los módulos 'useContext' y 'useEffect' desde React
import { useContext, useEffect } from "react";
// Importar el objeto de contexto 'UseContex' desde el archivo 'UseContex' dentro de la carpeta 'context'
import { UseContex } from "../context/UseContex";
// Importar el hook 'useNavigate' desde React Router DOM para realizar redirecciones de navegación
import { useNavigate } from "react-router-dom";

// Definir el componente 'PrivateRouter' que se utiliza para proteger rutas privadas
export const PrivateRouter = ({ children }) => {
  // Obtener la función 'navigate' para realizar redirecciones de navegación
  const navigate = useNavigate();
  // Utilizar el hook 'useContext' para acceder al contexto 'UseContex' y obtener el valor de 'logged'
  const { logged } = useContext(UseContex);

  // Utilizar el hook 'useEffect' para ejecutar una acción al montar el componente
  useEffect(() => {
    // Verificar si el usuario no está autenticado (si 'logged' es false)
    if (!logged) {
      // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión ('/login')
      navigate("/login");
      return; // La instrucción 'return' se utiliza para salir de la función después de la redirección
    }
  }, []);

  // Devolver el contenido de los componentes hijos pasados como prop ('children')
  return children;
};
