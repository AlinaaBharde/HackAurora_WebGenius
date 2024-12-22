import React, { useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { IoCalendarNumber } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import axios from "axios";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { MdVideoCall } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { FaVrCardboard } from 'react-icons/fa';

import icon from "../utils/icon.PNG";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  function handleClick(){
    window.location.href = "http://localhost:5173";
  }
   function handleClick2() {
     window.location.href = "http://localhost:3004";
   }
  function openTodo() {
    navigate("/Home/todos");
  }
  function openProject() {
    navigate("/Home/Project");
  }

  function openNotes() {
    navigate("/Home/notes");
  }
  function gototDashboard() {
    navigate("/Home");
  }
  function gotoVideo() {
    navigate("/video");
  }
  function gotoVr() {
    navigate("/vr");
  }

  function logOut() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/logout`)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav className="nav-left" data-aos="fade-right">
      <button className="todo-theme">
        <img src={icon} alt="" />
      </button>
      <button onClick={gototDashboard} className="nav-icon skull">
        <BiSolidDashboard size={22} color="white" />
      </button>
      <button onClick={openTodo} className="nav-icon skull">
        <LuListTodo size={20} color="white" />
      </button>
      <button onClick={openProject} className="nav-icon skull">
        <IoCalendarNumber size={20} color="white" />
      </button>
      <button onClick={openNotes} className="nav-icon skull">
        <FaRegNoteSticky size={20} color="white" />
      </button>
      <button onClick={handleClick} className="nav-icon skull">
        <IoMdDocument size={20} color="white" />
      </button>
      <button onClick={handleClick2} className="nav-icon skull">
        <FaCode size={20} color="white" />
      </button>
      <button className="nav-icon skull" onClick={gotoVideo}>
        <MdVideoCall size={20} color="white" />
      </button>
      <button className="nav-icon skull" onClick={gotoVr}>
        <FaVrCardboard size={20} color="white" />
      </button>
      {/* <button className="nav-icon skull" onClick={gotoVideo}>
        <MdVideoCall size={20} color="white" />
      </button> */}
      <button className="nav-icon skull" onClick={logOut}>
        <BiLogOut size={22} color="white" />
      </button>
    </nav>
  );
};

export default Navbar;
