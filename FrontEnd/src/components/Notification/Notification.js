import React, { useEffect } from "react";
import "./notification.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Notification = ({ closeNotifi, upcomingProjects }) => {
  console.log(upcomingProjects);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      className="not-div"
      data-aos="zoom-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="not-header">
        <h3>Today's Projects</h3>
        <button onClick={closeNotifi}>X</button>
      </div>
      <div className="not-items">
        {upcomingProjects.length === 0 && (
          <h4 id="no-Projects">No Projects for Today</h4>
        )}

        {upcomingProjects.map((eachProject) => (
          <div key={eachProject.id} className="not-each-item">
            <h4>{eachProject.Project.ProjectName}</h4>
            <h4>Priority : {eachProject.Project.priority}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
