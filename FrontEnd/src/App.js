// import Toggler from "./components/Toggler";
// import Project from "./components/Project";
// import Home from "./components/Home";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import Todo from "./components/Todo";
// import Dashboard from "./components/Dashboard";
// import Notes from "./components/Notes";
// import ForgotPass from "./components/ForgotPass";
// import ResetPass from "./components/ResetPass";
// import TaskManager from "./pages/taskManager";
// import { useState } from "react";
// import Task from './components/taskManager/Task';
// // Authentication imports
// import Register from './pages/RegisterSW'
// import LoginPage from './pages/LoginSW';
// import { useFirebase } from './context/FirebaseSW';
// import Sidebar from './components/taskManager/Sidebar'
// function App() {
//   const firebase = useFirebase();

//   const [notes, setNotes] = useState([]);
//   const [Projects, setProjects] = useState([]);
//   const [todo, setTodo] = useState([]);

//   return (
//     <>

//       {/* <ToastContainer
//         position="top-center"
//         autoClose={800}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       /> */}
//       <Routes>
//         {/* Authentication Routes */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/register" element={<Register />} />
//         {/* DashBoard Routes */}
//         {/* <Route path="/" element={<Toggler toast={toast} />}></Route> */}
//         <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
//         <Route
//           path="/ResetPass/:id/:token"
//           element={<ResetPass toast={toast} />}
//         />
//         {/* <Route path="/tasks" element={<TaskManager />} /> */}
//         <Route path="/:projectId" element={<Task />} />
//         <Route path="/Home" element={<Home Projects={Projects} />}>
//           <Route
//             index
//             element={
//               <Dashboard
//                 notes={notes}
//                 setNotes={setNotes}
//                 Projects={Projects}
//                 setProjects={setProjects}
//                 todo={todo}
//                 setTodo={setTodo}
//               />
//             }
//           />
//           <Route
//             path="/Home/todos"
//             element={<Todo toast={toast} todo={todo} setTodo={setTodo} />}
//           />
//           <Route
//             path="/Home/notes"
//             element={<Notes notes={notes} setNotes={setNotes} toast={toast} />}
//           />
//           <Route
//             path="/Home/Project"
//             element={<Project toast={toast} Projects={Projects} setProjects={setProjects} />}
//           />



//         </Route>
//       </Routes>

//     </>


//   );
// }

// const Task2 = () => (
//   <div className="flex bg-gray-100">
//     <div className="w-1/4"><Sidebar /></div>
//     <div className="flex-grow pl-5">
//       <Task />
//       {/* <TeacherPortal /> */}
//     </div>
//   </div>
// );

// // export default App;
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Toggler from "./components/Toggler";
// import Project from "./components/Project";
// import Home from "./components/Home";
// import Todo from "./components/Todo";
// import Dashboard from "./components/Dashboard";
// import Notes from "./components/Notes";
// import ForgotPass from "./components/ForgotPass";
// import ResetPass from "./components/ResetPass";
// import TM from "./pages/taskManager";
// import Task from "./components/taskManager/Task";
// import Sidebar from "./components/taskManager/Sidebar";
// import Register from "./pages/RegisterSW";
// import LoginPage from "./pages/LoginSW";
// import AppLayout from "./components/taskManager/AppLayout";
// import KeshavPage from "./pages/KeshavPage"
// import { Toaster } from "react-hot-toast";

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [Projects, setProjects] = useState([]);
//   const [todo, setTodo] = useState([]);

//   return (
//     <>
//       <BrowserRouter>
//         {/* Global Toast Notifications */}
//         <ToastContainer position="top-center" autoClose={800} hideProgressBar={false} theme="light" />
//         <Toaster position="top-right" gutter={8} />

//         <Routes>
//           {/* Authentication Routes */}
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
//           <Route path="/ResetPass/:id/:token" element={<ResetPass toast={toast} />} />

//           {/* Dashboard Routes */}
//           <Route
//             path="/Home"
//             element={
//               <Home Projects={Projects}>
//                 <Dashboard notes={notes} setNotes={setNotes} Projects={Projects} setProjects={setProjects} todo={todo} setTodo={setTodo} />
//               </Home>
//             }
//           >
//             <Route path="/Home/todos" element={<Todo toast={toast} todo={todo} setTodo={setTodo} />} />
//             <Route path="/Home/notes" element={<Notes notes={notes} setNotes={setNotes} toast={toast} />} />
//             <Route path="/Home/Project" element={<Project toast={toast} Projects={Projects} setProjects={setProjects} />} />
//           </Route>

//           {/* Task Manager Routes */}
//           <Routes>
//             {/* Task Manager Base Route */}
//             <Route path="/task" element={<TM />} />
//             {/* Task Details Route */}
//             <Route path="/task/:projectId" element={<TM showDetails={true} />} />
//           </Routes>
//           {/* <Route
//             path="/tasks/:projectId"
//             element={
//               <div className="flex bg-gray-100">
//                 <Sidebar />
//                 <Task />
//               </div>
//             }
//           /> */}

//           {/* Welcome Page from Old Project */}

//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggler from "./components/Toggler";
import Project from "./components/Project";
import Home from "./components/Home";
import Todo from "./components/Todo";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";
import TM from "./pages/taskManager";
import Task from "./components/taskManager/Task";
import Sidebar from "./components/taskManager/Sidebar";
import Register from "./pages/RegisterSW";
import LoginPage from "./pages/LoginSW";
import AppLayout from "./components/taskManager/AppLayout";
import KeshavPage from "./pages/KeshavPage";
import { Toaster } from "react-hot-toast";
import MainNote from "./components/DashBoardCom/MainNote";


// videoSDK from sanskar
import VideoSW from "./pages/VideoSW"




function App() {
  const [notes, setNotes] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [todo, setTodo] = useState([]);
  // videoSDk


  return (
    <>
      <BrowserRouter>
        {/* Global Toast Notifications */}
        <ToastContainer position="top-center" autoClose={800} hideProgressBar={false} theme="light" />
        <Toaster position="top-right" gutter={8} />

        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ForgotPass" element={<ForgotPass toast={toast} />} />
          <Route path="/ResetPass/:id/:token" element={<ResetPass toast={toast} />} />

          {/* Dashboard Routes */}
          {/* <Route
            path="/Home"
            element={
              <Home Projects={Projects}>
                <Dashboard notes={notes} setNotes={setNotes} Projects={Projects} setProjects={setProjects} todo={todo} setTodo={setTodo} />
              </Home>
            }
          > */}
          <Route path="/Home" element={<Home Projects={Projects} />}>
  <Route index element={<Dashboard 
    notes={notes} 
    setNotes={setNotes} 
    Projects={Projects} 
    setProjects={setProjects} 
    todo={todo} 
    setTodo={setTodo} 
  />} />
{/* </Route> */}
            <Route path="/Home/todos" element={<Todo toast={toast} todo={todo} setTodo={setTodo} />} />
            <Route path="/Home/notes" element={<Notes notes={notes} setNotes={setNotes} toast={toast} />} />
            <Route path="/Home/Project" element={<Project toast={toast} Projects={Projects} setProjects={setProjects} />} />
          </Route>

          <Route path="/video" element={<VideoSW />} />

          {/* Task Manager Routes */}
          <Route path="/task" element={<TM />} />
          <Route path="/task/:projectId" element={<TM showDetails={true} />} />

          {/* Optional routes like KeshavPage */}
          {/* <Route path="/keshav" element={<KeshavPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

