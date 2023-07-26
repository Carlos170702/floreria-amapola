// Importar el componente 'InitialStates' desde el archivo 'initialStates' dentro de la carpeta 'context'
import { InitialStates } from "./context/initialStates";
// Importar el componente 'RouterPrincipal' desde el archivo 'RouterPrincipal' dentro de la carpeta 'router'
import { RouterPrincipal } from "./router/RouterPrincipal";

// Definir el componente 'App' que es el componente principal de la aplicación
// Renderizar el componente 'InitialStates' como un proveedor de contexto que encapsula el componente 'RouterPrincipal'
function App() {
  // Renderizar el componente 'InitialStates' como un proveedor de contexto que encapsula el componente 'RouterPrincipal'
  return (
    <div style={{ overflowX: "hidden" }}>
      <InitialStates>
        <RouterPrincipal />
      </InitialStates>
    </div>
  );
}

// Exportar el componente 'App' para que pueda ser utilizado en otros archivos
export default App;
