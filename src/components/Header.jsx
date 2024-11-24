import React from "react";
import logo from "../assets/ecowiser.jpeg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <a
        href="https://wiser.eco/"
        target="_blank"
        rel="noopener noreferrer"
        className="about"
      >
        About
      </a>
    </div>
  );
};

export default Header;
