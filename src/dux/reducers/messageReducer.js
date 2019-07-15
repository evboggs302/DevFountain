const initialState = {
  messages: null
};

const MESSAGES = "MESSAGES";

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGES:
      console.log("New Message: ", action.payload);
      return { ...state, messages: action.payload };
    default:
      return "this is the initital state", state;
  }
}

export function setMessages(messages) {
  return {
    type: MESSAGES,
    payload: messages
  };
}
