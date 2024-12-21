import React, { useEffect } from "react";
import { FaHandPointRight } from "react-icons/fa";
import axios from "axios";

const MainProject = ({ Projects, setProjects }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/Project/getProject`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, [setProjects]);

  return (
    <div className="scroller">
      <div className="content-Project scroller-inner">
        <div className="scroller-con">
          <div className="dots">
            <p id="one"></p>
            <p id="two"></p>
            <p id="three"></p>
          </div>
          <span id="scroller-con-col">" Master Your Day With Projects."</span>
          <br />
          <br />
          Revoloutionize your productivity journey with our Project Manager.
        </div>
        <div className="scroller-con">
          <div className="dots">
            <p id="one"></p>
            <p id="two"></p>
            <p id="three"></p>
          </div>
          Seamlesly organize your project, set priorities and conquer your goal
          with a deadline
          <br />
          Elevate your productivity game - it's time to take charge!...
        </div>
        <div className="scroller-con">
          <div className="dots">
            <p id="one"></p>
            <p id="two"></p>
            <p id="three"></p>
          </div>
          Robust encryptoin measures.
          <br />
          <br />
          <span id="scroller-con-col">" Your project's in safe hands." </span>
        </div>
        <div className="scroller-con">
          <div className="dots">
            <p id="one"></p>
            <p id="two"></p>
            <p id="three"></p>
          </div>
          Some of your upcoming Projects (readonly)...
          <br />
          <br />
          <FaHandPointRight size={30} style={{ marginLeft: "50%" }} />
        </div>
        {Projects.map((eachProject) => (
          <div id="dash-Project-con" key={eachProject.id}>
            <h4>Project Name : {eachProject.Project.ProjectName}</h4>
            <h4>Priority : {eachProject.Project.priority}</h4>
            <h4>Deadline : {eachProject.Project.deadline}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainProject;
