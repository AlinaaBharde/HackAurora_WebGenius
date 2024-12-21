import React from "react";
import { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./styles/Home.css";
import Navbar from "./NavbarAB";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = ({ Projects }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      {loading ? (
        <BeatLoader
          color={"#39A7FF"}
          loading={loading}
          // cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="main-home-container" data-aos="zoom-out">
          <Navbar />
          <Outlet />
          <Profile Projects={Projects} />
        </div>
      )}
    </>
  );
};

export default Home;
