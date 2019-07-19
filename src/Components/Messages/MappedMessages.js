import React from "react";

export default function MappedMessages(props) {
  return (
    <div>
      <li>{props.sender}</li>
      <li>{props.content}</li>
    </div>
  );
}
