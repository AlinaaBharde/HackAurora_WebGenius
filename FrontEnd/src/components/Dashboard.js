import React, { useEffect } from "react";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import MainNote from "./DashBoardCom/MainNote";
import MainProject from "./DashBoardCom/MainProject";
import MainTodo from "./DashBoardCom/MainTodo";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const Dashboard = ({ notes, setNotes, Projects, setProjects, todo, setTodo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  function expandTodo() {
    navigate("/Home/todos");
  }
  function expandProject() {
    navigate("/Home/Project");
  }
  function expandNote() {
    navigate("/Home/notes");
  }

  return (
    <div className="home-body-conatiner" data-aos="zoom-in">
      <header id="dash-header" className="search-bar">
        <h1>Dashboard</h1>
      </header>
      <main className="body-content ">
        <div className="notes" data-aos="fade-up-right">
          <div className="con-head">
            <p>Notes</p>
            <button onClick={expandNote} id="all">
              <AiOutlineArrowsAlt color="#F1EAFF" size={18} />
            </button>
          </div>
          <MainNote notes={notes} setNotes={setNotes} />
        </div>
        <div className="todos" data-aos="fade-up-left">
          <div className="con-head">
            <p>Todo's</p>
            <button onClick={expandTodo} id="all">
              <AiOutlineArrowsAlt color="#F1EAFF" size={18} />
            </button>
          </div>
          <MainTodo todo={todo} setTodo={setTodo} />
        </div>
        <div className="stats" data-aos="fade-up-right">
          <div className="con-head">
            <p>Projects</p>
            <button onClick={expandProject} id="all">
              <AiOutlineArrowsAlt color="#F1EAFF" size={18} />
            </button>
          </div>
          <MainProject Projects={Projects} setProjects={setProjects} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
