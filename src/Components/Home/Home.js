import React, { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import Header from "../Header/Header";

function Home(props) {
  // console.log(props)
  return (
    <div>
      <div>
        <Header />
      </div>
      Home
      <RegisterForm />
    </div>
  );
}

export default Home;
