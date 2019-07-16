const initialState = {
  allDevelopers: [],
  skills: []
};

const ALL_DEVELOPERS = "ALL_DEVELOPERS";

export default function marketplaceReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_DEVELOPERS:
      return { ...state, allDevelopers: action.payload };
    default:
      return state;
  }
}

export function setDevelopers(developers) {
  return {
    type: ALL_DEVELOPERS,
    payload: developers
  };
}
