import React, { useState } from "react";

function TestHook() {
  let [count, setCount] = useState(0);
  const decrement = () => setCount((count -= 1));
  const increment = () => setCount((count += 1));

  return (
    <div className="App">
      <h1>Testing React Hooks</h1>
      <p data-testid="countvalue">{count}</p>
      <button data-testid="decrementButton" onClick={decrement}>
        -
      </button>

      <button data-testid="incrementButton" onClick={increment}>
        +
      </button>
    </div>
  );
}

export default TestHook;
