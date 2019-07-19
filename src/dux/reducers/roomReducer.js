const initialState = {
  rooms: []
};

const ROOMS = "ROOMS";

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case ROOMS:
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
}

export function setRooms(rooms) {
  return {
    type: ROOMS,
    payload: rooms
  };
}
