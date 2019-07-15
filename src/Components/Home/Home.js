import React from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import Header from "../Header/Header";
import "./Home.scss";

function Home(props) {
  console.log(props);
  return (
    <div>
      <div>
        <Header {...props} />
      </div>
      <div className="home-register">
        <RegisterForm {...props} />
      </div>
    </div>
  );
}

export default Home;
