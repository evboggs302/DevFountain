import init from "jooks";
import UseFetch from "../../Components/usefetch";

// Evan's Unit Testing

// Without JOOKS, you will get the following error message during your testing: "Invariant Violation: Invalid hook call. Hooks can only be called inside of the body of a function component". JOOKS has a built in environment that is a function.

describe("UseFetch hook", () => {
  // Initialize the Jooks wrapper
  const jooks = init(() => UseFetch());

  it("initial values test", () => {
    // Run your Hook function
    let result = jooks.run();
    // And then test the result
    expect(result.data).toBeNull();
    expect(result.loading).toBe(false);
  });

  it("data info is null and can be changed", () => {
    // Run your Hook function
    let result = jooks.run();
    expect(result.data).toBeNull();
    // Call the hooks function to update state
    result.setData("Testing 1 2 3");
    // Run the Hook again to get the new values
    result = jooks.run();
    expect(result.data).toBe("Testing 1 2 3");
  });
});
