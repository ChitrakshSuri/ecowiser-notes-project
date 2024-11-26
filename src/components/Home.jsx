import React from "react";
import "./Home.css";
import DownArrow from "../assets/DownArrow.svg"

function Home() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll by the height of the viewport
      behavior: "smooth",
    });
  };

  return (
    <div className="home-cont">
      <div className="company-data-cont">
        <div className="company-name">Eco Notes.</div>
        <div className="company-info">
          Eco Notes is an intuitive note-taking platform designed to simplify
          your organization and productivity. With features like categorization,
          real-time syncing, and an eco-friendly approach, it empowers users to
          manage their thoughts, tasks, and ideas efficiently. Tailored for
          individuals and teams, Eco Notes offers seamless functionality to keep
          you organized while staying aligned with sustainable values.
        </div>
      </div>
      <button className="down-arrow-btn" onClick={scrollToNextSection}>
      <img className="down-arrow-btn" src={DownArrow} alt="" />
      </button>
    </div>
  );
}

export default Home;
