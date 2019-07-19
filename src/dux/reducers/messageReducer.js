const initialState = {
  messages: []
};

const MESSAGES = "MESSAGES";

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGES:
      return { messages: [...action.payload] };
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
