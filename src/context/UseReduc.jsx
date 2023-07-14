import { GET_FLOWERS, LOGIN, RESET, UPDATE_USER } from "./types";

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
    default:
      return state;
  }
};
