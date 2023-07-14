import { useContext } from "react";
import { InitialStates } from "./context/initialStates";
import { Loading } from "./pages/components/Loading";
import { RouterPrincipal } from "./router/RouterPrincipal";
import { UseContex } from "./context/UseContex";

function App() {
  return (
    <InitialStates>      
      <RouterPrincipal />
    </InitialStates>
  );
}

export default App;
