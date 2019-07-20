import init from "jooks";
import HotMess from "./getMessagesTest";

describe("Testing setMessages Hook", () => {
  const jooks = init(() => HotMess());

  //  unit 1
  it("Should update the data right", () => {
    let { messages, setMessages } = jooks.run();
    expect(messages).toEqual(["hello", "goodbye"]);

    setMessages([...messages, "hello"]);
    ({ messages } = jooks.run());
    expect(messages).toEqual(["hello", "goodbye", "hello"]);
  }),
    //unit 2
    it("Should give the updated roomName", () => {
      let { roomName, setRoomName } = jooks.run();
      expect(roomName).toBe("");

      setRoomName("JoeJosh");
      ({ roomName } = jooks.run());
      expect(roomName).toBe("JoeJosh");
    });
});
