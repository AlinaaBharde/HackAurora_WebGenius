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

const Profile = ({ Projects }) => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [user, setUser] = useState();
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 1200 });
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/getUser`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Project/getProject`)
      .then((res) => {
        let temp = res.data.filter(
          (obj) =>
            obj.done === false &&
            obj.Project.deadline === new Date().toISOString().split("T")[0]
        );
        setUpcomingProjects(temp);
      })
      .catch((err) => console.log(err));
  }, [Projects]);

  console.log(upcomingProjects);

  const reloadQuote = () => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });
  };

  function openNotifi() {
    setDialog({ isLoading: true });
  }
  function closeNotifi() {
    setDialog({ isLoading: false });
  }
  return (
    <React.Fragment>
      <div className="profile" data-aos="fade-left">
        <div className="profile-div">
          <DarkMode />
          <button
            className={`${upcomingProjects.length ? " bell" : ""}`}
            onClick={openNotifi}
          >
            <span id="noti-count">{upcomingProjects.length}</span>
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
      </div>
    </React.Fragment>
  );
};

export default Profile;
