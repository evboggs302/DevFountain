import React from "react";

export default function MappedMessages(props) {
  return (
    <div>
      <li>{props.content}</li>
      <li>{props.sender}</li>
    </div>
  );
}
