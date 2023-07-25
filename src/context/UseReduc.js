// Importar las constantes de acción desde el archivo 'types'
import {
  ADD_TO_CAR,
  DELETE_ALL_CAR,
  GET_FLOWERS,
  LOGIN,
  REMOVE_FROM_CAR,
  RESET,
  SELECT_FLOWER,
  UPDATE_USER,
} from "./types";

// Definir un reducer que gestionará los cambios en el estado basado en las acciones recibidas
export default (state, action) => {
  // Extraer la propiedad 'payload' y 'type' del objeto 'action'
  const { payload, type } = action;

  // Utilizar una instrucción switch para manejar diferentes tipos de acciones
  switch (type) {
    case LOGIN:
      return { ...state, ...payload };
    case GET_FLOWERS:
      return { ...state, ...payload };
    case RESET:
      return payload;
    case UPDATE_USER:
      return { ...state, dataUser: payload };
    case SELECT_FLOWER:
      return { ...state, flowerSelected: payload };
    case ADD_TO_CAR:
      // Encontrar la flor a añadir en la lista de todas las flores
      const addeFlower = state.allFlowers.find(
        (item) => item.CvInventario === payload?.CvInventario
      );
      // Verificar si la flor ya existe en el carrito
      const itemExist = state.car.find(
        (item) => item.CvInventario === addeFlower.CvInventario
      );

      // Actualizar el estado según la existencia de la flor en el carrito
      return itemExist
        ? {
            ...state,
            car: state.car.map((flower) => {
              return flower.CvInventario == addeFlower.CvInventario
                ? {
                    ...flower,
                    quantity: flower.quantity + 1,
                  }
                : { ...flower };
            }),
          }
        : {
            ...state,
            car: [...state.car, { ...addeFlower, quantity: 1 }],
          };
    case REMOVE_FROM_CAR:
      const flowerExist = state.car.find(
        (flower) => flower?.CvInventario == payload?.CvInventario
      );

      // Si la flor existe, actualizar la cantidad en el carrito
      if (flowerExist) {
        const updatedCar = state.car.map((flower) => {
          return flower.CvInventario == flowerExist.CvInventario
            ? {
                ...flower,
                quantity: flower.quantity - 1,
              }
            : { ...flower };
        });

        // Filtrar las flores con cantidad mayor a cero en el carrito
        const filteredCar = updatedCar.filter((flower) => flower.quantity > 0);

        // Devolver el estado actualizado con el carrito modificado
        return {
          ...state,
          car: filteredCar,
        };
      } else {
        // Si la flor no existe, devolver el estado actual sin cambios
        return {
          ...state,
          car: state.car,
        };
      }
    case DELETE_ALL_CAR:
      // Devolver el estado con el carrito vacío
      return {
        ...state,
        car: [],
      };
    default:
      // Si la acción no coincide con ninguna de las anteriores, devolver el estado sin cambios
      return state;
  }
};
