import React from "react";
import logo from "../assets/ecowiser.jpeg";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="logo"/>
        <div>Eco Keep</div>
      </div>
    </>
  );
};

export default Header;
