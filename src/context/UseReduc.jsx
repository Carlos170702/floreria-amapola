import {
  ADD_TO_CAR,
  GET_FLOWERS,
  LOGIN,
  REMOVE_FROM_CAR,
  RESET,
  SELECT_FLOWER,
  UPDATE_USER,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;

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
      const addeFlower = state.allFlowers.find(
        (item) => item.CvInventario === payload?.CvInventario
      );
      const itemExist = state.car.find(
        (item) => item.CvInventario === addeFlower.CvInventario
      );

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
      const flowerExist = state.car.find((flower) => flower?.CvInventario == payload?.CvInventario);
      const flowerPosition = state.car.findIndex(
        (flower) => flower?.CvInventario == payload?.CvInventario
      );

      return flowerExist
        ? {
            ...state,
            car: state.car.map((flower) => {
              return flower.CvInventario == flowerExist.CvInventario
                ? {
                    ...flower,
                    quantity: flower.quantity - 1,
                  }
                : { ...flower };
            }),
          }
        : {
            ...state,
            car: state.car,
          };
    default:
      return state;
  }
};
