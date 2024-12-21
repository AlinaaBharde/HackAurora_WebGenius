import React, { useEffect, useState } from "react";
import DarkMode from "./DarkMode/Darkmode";
import Notification from "./Notification/Notification";
import { IoMdNotifications } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import TypeWriter from "typewriter-effect";
import Calendar from "./Calendar/Calendar";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
// import React, { useState, useEffect } from "react";
// import Aos from "aos";
// import TypeWriter from "typewriter-effect";
// import { IoMdNotifications } from "react-icons/io";
// import { TfiReload } from "react-icons/tfi";
// import DarkMode from "./DarkMode";
// import Notification from "./Notification";
// import Calendar from "./Calendar";

const Profile = ({ Projects }) => {
  const [user, setUser] = useState();
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [dialog, setDialog] = useState({ isLoading: false });

  const predefinedQuotes = [
    {
      quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  ];

  const QuoteComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reloadQuote = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % predefinedQuotes.length);
    };

    const { quote, author } = predefinedQuotes[currentIndex];
    return (
      <div className="quote-div" data-aos="zoom-in">
        <h3>
          <TypeWriter
            options={{
              autoStart: true,
              loop: true,
              delay: 100,
              strings: [`" ${quote} "`],
            }}
          />
        </h3>
        <hr />
        <div className="quote-footer">
          <h4 id="auth-name"> - {author}</h4>
          <button onClick={reloadQuote}>
            <TfiReload color="orangered" size={18} />
          </button>
        </div>
      </div>
    );
  };

  const openNotifi = () => {
    setDialog({ isLoading: true });
  };

  const closeNotifi = () => {
    setDialog({ isLoading: false });
  };

  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <div className="profile" data-aos="fade-left">
      <div className="profile-div">
        <DarkMode />
        <button
          className={`${upcomingProjects.length ? " bell" : ""}`}
          onClick={openNotifi}
          style={{paddingLeft:50}}
        >
          <span style={{height:20,width:20}} id="noti-count">{upcomingProjects.length}</span>
          <span>
            <IoMdNotifications size={25} color="#3081D0" />
          </span>
        </button>
        <img
          title={user && `${user.userName}`}
          id="prof-img"
          src={user && `${user.picUrl}`}
          alt=""
        />
      </div>
      {dialog.isLoading && (
        <Notification
          closeNotifi={closeNotifi}
          upcomingProjects={upcomingProjects}
        />
      )}
      <Calendar />
      <QuoteComponent />
    </div>
  );
};

export default Profile;
