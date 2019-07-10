import React from "react";
import TestHook from "./testHook";
import { render, fireEvent, getByTestId } from "@testing-library/react";

describe("testing hooks", () => {
  it("initial state of 0", () => {
    const { container } = render(<TestHook />);
    const countValue = getByTestId(container, "countvalue");
    expect(countValue.textContent).toBe("0");
  });
  it("Increment and decrement buttons work", () => {
    const { container } = render(<TestHook />);
    const countValue = getByTestId(container, "countvalue");
    const increment = getByTestId(container, "incrementButton");
    const decrement = getByTestId(container, "decrementButton");
    expect(countValue.textContent).toBe("0");
    fireEvent.click(increment);
    expect(countValue.textContent).toBe("1");
    fireEvent.click(decrement);
    expect(countValue.textContent).toBe("0");
  });
});
