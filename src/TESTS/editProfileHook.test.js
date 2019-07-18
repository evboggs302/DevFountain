// import React from 'react';
// import Profile from "../Components/Profile/Profile";
// import { Provider } from "react-redux";
// import store from "../dux/store";
// import { render, fireEvent, getByTestId } from "@testing-library/react";
// // props.match.params.email
// const match =  {
//     params: {
//         email: ""
//     }
// }

// describe("testing hooks", () => {
//     it("initial state of profile" , () => {
//         const { container } = render(
//         <Provider store={store}>
//          <Profile match={match}  />
//         </Provider>
//         );
//         console.log(container)
//         const originalValue = getByTestId(container.Profile, "originalValue");
//         return expect(originalValue.className).toBe("profile");
//     });
// })