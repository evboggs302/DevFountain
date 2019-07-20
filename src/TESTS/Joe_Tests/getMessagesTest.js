import { useState } from "react";

export default function HotMess() {
  let [messages, setMessages] = useState(["hello", "goodbye"]);
  let [roomName, setRoomName] = useState("");
  return { messages, setMessages, roomName, setRoomName };
}
