import React, { useState, useEffect } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import logo from "../assets/NEWSLETTER.png";
import "./Navbar.css";

function Navbar({ getGetSelectTopic, searchNews }) {

  const [activeTopic, setActiveTopic] = useState("Home");
  const [currentTime, setCurrentTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const topics = [
    "Politics",
    "Science & Tech",
    "Health",
    "Sports",
    "Climate",
    "Business"
  ];

  const handleClickTopic = (topic) => {
    getGetSelectTopic(topic);
    setActiveTopic(topic);
  };

  // Get current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Search
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      searchNews(searchTerm);
    }
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">
          <div className="logo-box">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for headlines"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
        </nav>
      </div>

      <div className="topic-bar">

        <ul className="topic-list">
          {topics.map((topic, id) => (
            <li
              key={id}
              onClick={() => handleClickTopic(topic)}
              className={`topic-item ${
                activeTopic === topic ? "active-topic" : ""
              }`}
            >
              {topic}
            </li>
          ))}
        </ul>

        <div className="weather-box">
          <h2 className="time">{currentTime}</h2>

          <h2 className="weather">
            <TiWeatherPartlySunny />
            24 °C
          </h2>
        </div>
      </div>
    </>
  );
}

export default Navbar;
