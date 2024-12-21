import Toggler from "./components/Toggler";
import Project from "./components/Project";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Todo from "./components/Todo";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import { useState } from "react";

// Authentication imports
import Register from './pages/RegisterSW'
import LoginPage from './pages/LoginSW';
import { useFirebase } from './context/FirebaseSW';
function App() {
  const firebase = useFirebase();

  const [notes, setNotes] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [todo, setTodo] = useState([]);

  return (
    <>

      {/* <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        {/* DashBoard Routes */}
        {/* <Route path="/" element={<Toggler toast={toast} />}></Route> */}
        <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
        <Route
          path="/ResetPass/:id/:token"
          element={<ResetPass toast={toast} />}
        />
        <Route path="/Home" element={<Home Projects={Projects} />}>
          <Route
            index
            element={
              <Dashboard
                notes={notes}
                setNotes={setNotes}
                Projects={Projects}
                setProjects={setProjects}
                todo={todo}
                setTodo={setTodo}
              />
            }
          />
          <Route
            path="/Home/todos"
            element={<Todo toast={toast} todo={todo} setTodo={setTodo} />}
          />
          <Route
            path="/Home/notes"
            element={<Notes notes={notes} setNotes={setNotes} toast={toast} />}
          />
          <Route
            path="/Home/Project"
            element={<Project toast={toast} Projects={Projects} setProjects={setProjects} />}
          />



        </Route>
      </Routes>

    </>


  );
}

export default App;
