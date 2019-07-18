import init from "jooks";
import EditProfileTest from "./editProfileHook";

describe("Testing useState hook", () => {
    const jooks = init(() => EditProfileTest());

    it("It should give the correct initial values", () => {
        //runs the hook function 
        const result = jooks.run()
        //testing the results
        expect(result.className).toBe("profile edit")
    }),

    it("It should give the correct new value", () => {
        //runs the hooks function
       let result = jooks.run()
       //testing the result
       expect(result.className).toBe("profile edit")
        //running the function setClassName passing in profile
        result.setClassName('profile');
        //re runs the hook function
        (result = jooks.run());
        //expects the result of the className to be 'profile'
        expect(result.className).toBe('profile') 
    })
})