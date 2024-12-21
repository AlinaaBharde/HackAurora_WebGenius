
// // export default Sidebar
// import React, { useCallback, useEffect, useState } from 'react'
// import AddProjectModal from './AddProjectModal'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// // import toast from 'react-hot-toast'

// const Sidebar = () => {
//   const [isModalOpen, setModalState] = useState(false)
//   const [projects, setProjects] = useState([])
//   const [paramsWindow, setParamsWindow] = useState(window.location.pathname.slice(1))
//   const [totalTasks, setTotalTasks] = useState(0) // New state for total tasks

//   useEffect(() => {
//     projectData()
//     document.addEventListener('projectUpdate', ({ detail }) => {
//       projectData()
//     })
//     return () => {
//       document.removeEventListener('projectUpdate', {}, false)
//     }
//   }, []);

//   const projectData = () => {
//     axios.get('http://localhost:9000/projects/')
//       .then((res) => {
//         setProjects(res.data)
//         // Calculate total tasks for all projects
//         const total = res.data.reduce((sum, project) => {
//           return sum + (project.tasks ? project.tasks.length : 0) // Assuming `tasks` is the field containing task data
//         }, 0)
//         setTotalTasks(total) // Set the total tasks count
//       })
//   }

//   const handleLocation = (e) => {
//     setParamsWindow(new URL(e.currentTarget.href).pathname.slice(1))
//   }

//   const openModal = useCallback(() => {
//     setModalState(true)
//   }, [])

//   const closeModal = useCallback(() => {
//     setModalState(false)
//   }, [])

//   return (
//     <div className='py-5'>
//       <div className="px-4 mb-3 flex items-center justify-between">
//         <span className=''>Members</span>
//         <button onClick={openModal} className='bg-indigo-200 rounded-full p-[2px] focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-1'>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
//             <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>
//       <ul className='border-r border-gray-300 pr-2'>
//         <Link to="/overall" onClick={(e) => handleLocation(e)}>
//           <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === 'overall' && 'text-indigo-600 bg-indigo-200/80'}`}>
//             Overall Project ({totalTasks} Tasks)
//           </li>
//         </Link>
//         {projects.map((project, index) => (
//           <Link key={index} to={project._id} onClick={(e) => handleLocation(e)}>
//             <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id && 'text-indigo-600 bg-indigo-200/80'}`}>
//               {project.name}
//             </li>
//           </Link>
//         ))}
//       </ul>
//       <AddProjectModal isModalOpen={isModalOpen} closeModal={closeModal} />
//     </div>
//   )
// }

// export default Sidebar

// import React, { useEffect, useState } from 'react';
// import AddProjectModal from './AddProjectModal';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//     const [isModalOpen, setModalState] = useState(false);
//     const [projects, setProjects] = useState([]);
//     const [paramsWindow, setParamsWindow] = useState(window.location.pathname.slice(1));
//     const [totalTasks, setTotalTasks] = useState(0);
//     const navigate = useNavigate();

//     // Fetch projects data
//     useEffect(() => {
//         projectData();
//         document.addEventListener('projectUpdate', ({ detail }) => {
//             projectData();
//         });

//         return () => {
//             document.removeEventListener('projectUpdate', {}, false);
//         };
//     }, []);

//     const projectData = () => {
//         axios.get('http://localhost:9000/projects/')
//             .then((res) => {
//                 console.log(res.data)
//                 setProjects(res.data);
//                 const total = res.data.reduce((sum, project) => {
//                     return sum + (project.tasks ? project.tasks.length : 0);
//                 }, 0);
//                 setTotalTasks(total);
//             });
//     };

//     // Fetch overall tasks from the backend
//     // const getOverallTasks = () => {
//     //     axios.get('http://localhost:9000/projects/overall')
//     //         .then((res) => {
//     //             // You can then process the response, store tasks, or navigate to the task page
//     //             console.log('All Tasks:', res.data.data.tasks);  // Process the tasks here
//     //             // Navigate to the overall task page if needed:
//     //             navigate('/overall');
//     //         })
//     //         .catch((err) => {
//     //             console.error('Error fetching overall tasks', err);
//     //         });
//     // };

//     const handleLocation = (e) => {
//         setParamsWindow(new URL(e.currentTarget.href).pathname.slice(1));
//     };

//     const openModal = () => {
//         setModalState(true);
//     };

//     const closeModal = () => {
//         setModalState(false);
//     };

//     return (
//         <div className="py-5">
//             <div className="px-4 mb-3 flex items-center justify-between">
//                 <span className="">Members</span>
//                 <button onClick={openModal} className="bg-indigo-200 rounded-full p-[2px] focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
//                         <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
//                     </svg>
//                 </button>
//             </div>
//             <ul className="border-r border-gray-300 pr-2">
//                 {/* <Link to="/overall" onClick={(e) => handleLocation(e)}>
//                     <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === 'overall' && 'text-indigo-600 bg-indigo-200/80'}`} onClick={getOverallTasks}>
//                         Overall Project ({totalTasks} Tasks)
//                     </li>
//                 </Link> */}
//                 {projects.map((project, index) => (
//                     <Link key={index} to={project._id} onClick={(e) => handleLocation(e)}>
//                         <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id && 'text-indigo-600 bg-indigo-200/80'}`}>
//                             {project.name}
//                         </li>
//                     </Link>
//                 ))}
//             </ul>
//             <AddProjectModal isModalOpen={isModalOpen} closeModal={closeModal} />
//         </div>
//     );
// };

// export default Sidebar;

import React, { useEffect, useState } from 'react';
import AddProjectModal from './AddProjectModal';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const Sidebar = () => {
    const [isModalOpen, setModalState] = useState(false);
    const [projects, setProjects] = useState([]);
    const [paramsWindow, setParamsWindow] = useState(window.location.pathname.slice(1));
    const [totalTasks, setTotalTasks] = useState(0);
    const navigate = useNavigate();


    const handleNavigate = (id) => {
        localStorage.setItem('projectId', id); // Store the projectId in localStorage
        navigate(`/task/${id}`);
    };
    // Fetch projects data using fetch instead of axios
    useEffect(() => {
        projectData();
        document.addEventListener('projectUpdate', ({ detail }) => {
            projectData();
        });

        return () => {
            document.removeEventListener('projectUpdate', {}, false);
        };
    }, []);

    // const projectData = () => {
    //     fetch('http://localhost:9000/projects/')
    //     console.log("hello")
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             setProjects(data);
    //             const total = data.reduce((sum, project) => {
    //                 return sum + (project.tasks ? project.tasks.length : 0);
    //             }, 0);
    //             setTotalTasks(total);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching projects:', error);
    //         });
    // };
    const projectData = () => {
        fetch('/projects/')
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched Projects:', data);
                setProjects(data);
                const total = data.reduce((sum, project) => {
                    return sum + (project.tasks ? project.tasks.length : 0);
                }, 0);
                setTotalTasks(total);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
            });
    };

    // Fetch overall tasks from the backend (using fetch)
    // const getOverallTasks = () => {
    //     fetch('http://localhost:9000/projects/overall')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Process the tasks here
    //             console.log('All Tasks:', data.data.tasks);
    //             navigate('/overall');
    //         })
    //         .catch((err) => {
    //             console.error('Error fetching overall tasks', err);
    //         });
    // };

    const handleLocation = (e) => {
        // navigate("/tasks/${}",)
        setParamsWindow(new URL(e.currentTarget.href).pathname.slice(1));
    }

    // const onClickHandle = (_id) => {
    //     navigate(`/KeshavPage`, { state: { id: _id } });
    // }

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
    };

    return (
        <div className="py-5">
            <div className="px-4 mb-3 flex items-center justify-between">
                <span className="">Members</span>
                <button onClick={openModal} className="bg-indigo-200 rounded-full p-[2px] focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-offset-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <ul className="border-r border-gray-300 pr-2">
                {/* <Link to="/overall" onClick={(e) => handleLocation(e)}>
                    <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === 'overall' && 'text-indigo-600 bg-indigo-200/80'}`} onClick={getOverallTasks}>
                        Overall Project ({totalTasks} Tasks)
                    </li>
                </Link> */}
                {/* {projects.map((project, index) => (
                    <div
                        key={index}
                        onClick={() => onClickHandle(project._id)} // Corrected syntax for state
                    >
                        <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id ? 'text-indigo-600 bg-indigo-200/80' : ''}`}>
                            {project.name}
                        </li>
                    </div>

                ))} */}
                {/* {projects.map((project, index) => (
                    // <Link key={index} to={project._id} onClick={(e) => handleLocation(e)}>
                    //     <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id && 'text-indigo-600 bg-indigo-200/80'}`}>
                    //         {project.name}
                    //     </li>
                    // </Link>
                    <Link key={index} to={`/task/${project._id}`} onClick={(e) => handleLocation(e)}>
                        <li className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id && 'text-indigo-600 bg-indigo-200/80'}`}>
                            {project.name}
                        </li>
                    </Link>
                ))} */}
                {projects.map((project, index) => (
                    <li
                        key={index}
                        onClick={() => handleNavigate(project._id)} // Navigate and store projectId
                        className={`px-5 py-1.5 mb-1 text-gray-600 font text-sm capitalize select-none hover:text-indigo-600 rounded transition-colors hover:bg-indigo-200/80 ${paramsWindow === project._id && 'text-indigo-600 bg-indigo-200/80'}`}
                    >
                        {project.name}
                    </li>
                ))}
            </ul>
            <AddProjectModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
};

export default Sidebar;