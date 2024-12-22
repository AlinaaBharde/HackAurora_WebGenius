import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/Project.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Project = ({ toast, Projects, setProjects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedProjects, setCompletedProjects] = useState([]);
  const [Project, setProject] = useState({
    ProjectName: "",
    priority: "",
    deadline: "",
  });
 const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${process.env.REACT_APP_API_URL}/Project/getProject`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setProjects(res.data);
        setCompletedProjects(temp);
      })
      .catch((err) => console.log(err));
  }, [setProjects]);

  function handleOnchange(e) {
    e.preventDefault();
    setProject({
      ...Project,
      [e.target.name]: e.target.value,
    });
  }

  const addProject = () => {
    if (Project.ProjectName.trim() === "" || Project.deadline === "") {
      toast.error("Please enter Project and deadline");
      return;
    }
    const selectedDate = new Date(Project.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newProject = {
      id: crypto.randomUUID(),
      Project,
      done: false,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/Project/postProject`, newProject)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setProjects([...Projects, newProject]);
    toast.success("Added Successfully");
    setProject({ ProjectName: "", priority: "top", deadline: "" });
  };

  const addToComplete = (id) => {
    const updatedProjects = Projects.map((eachProject) =>
      eachProject.id === id ? { ...eachProject, done: true } : eachProject
    );
    setProjects(updatedProjects);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/Project/updateProject/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = Projects.find((eachProject) => eachProject.id === id);
    if (completed) setCompletedProjects([...completedProjects, completed]);
  };

  const removeProject = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/Project/deleteProject/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setProjects(Projects.filter((eachProject) => id !== eachProject.id));
    setCompletedProjects(completedProjects.filter((eachProject) => id !== eachProject.id));
  };

  const upcomingProjects = Projects.filter((eachProject) => !eachProject.done);

  const comingFilteredItems = useMemo(() => {
    return upcomingProjects.filter((eachItem) => {
      return eachItem.Project.ProjectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingProjects, searchQuery]);

  const comingCompletedItems = useMemo(() => {
    return completedProjects.filter((eachItem) => {
      return eachItem.Project.ProjectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, completedProjects]);

  return (
    <div className="home-body-conatiner" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Project's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter project"
          name="ProjectName"
          value={Project.ProjectName || ""}
          onChange={(e) => handleOnchange(e)}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={Project.priority}
          onChange={(e) => handleOnchange(e)}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={Project.deadline}
          onChange={(e) => handleOnchange(e)}
        />
        <button id="add-bt" onClick={addProject}>
          Add
        </button>
      </div>
      <main className="Project-body" data-aos="zoom-out">
        <h3>current projects</h3>
        <div className="cur-Project-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>Prioriy</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* {comingFilteredItems.map((eachProject) => ( */}
                <tr key={1} onClick={() => navigate("/task")}>
                  <td>Project 1</td>
                  <td>Average</td>
                  <td>3 months</td>
                  <td>
                    {/* {!eachProject.done && (
                      <button
                        id="done-bt"
                        onClick={() => addToComplete(eachProject.id)}
                      >
                        done
                      </button>
                    )} */}
                    In Progress
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
        <h3>Completed projects</h3>
        <div className="completed-Project" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>priority</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {comingCompletedItems.map((eachProject) => (
                <tr key={eachProject.id}>
                  <td>{eachProject.Project.ProjectName}</td>
                  <td>{eachProject.Project.priority}</td>
                  <td>{eachProject.Project.deadline}</td>
                  <td>
                    <button
                      id="Project-remove"
                      onClick={() => removeProject(eachProject.id)}
                    >
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Project;
