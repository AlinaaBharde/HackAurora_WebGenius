
// import React, { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { v4 as uuid } from "uuid";
// import AddTaskModal from "./AddTaskModal";
// import BtnPrimary from './BtnPrimary'
// import DropdownMenu from "./DropdownMenu";
// import { useParams, useNavigate } from "react-router";
// import ProjectDropdown from "./ProjectDropdown"
// import axios from "axios";
// import toast from "react-hot-toast";
// import TaskModal from "./TaskModal";
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useLocation } from "react-router-dom";

// // Register required chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// function Task() {

//     const onDragEnd = (result, columns, setColumns) => {
//         if (!result.destination) return;
//         const { source, destination } = result;
//         let data = {}
//         if (source.droppableId !== destination.droppableId) {
//             const sourceColumn = columns[source.droppableId];
//             const destColumn = columns[destination.droppableId];
//             const sourceItems = [...sourceColumn.items];
//             const destItems = [...destColumn.items];
//             const [removed] = sourceItems.splice(source.index, 1);
//             destItems.splice(destination.index, 0, removed);

//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...sourceColumn,
//                     items: sourceItems
//                 },
//                 [destination.droppableId]: {
//                     ...destColumn,
//                     items: destItems
//                 }
//             });
//             data = {
//                 ...columns,
//                 [source.droppableId]: {
//                     ...sourceColumn,
//                     items: sourceItems
//                 },
//                 [destination.droppableId]: {
//                     ...destColumn,
//                     items: destItems
//                 }
//             }
//         } else {
//             const column = columns[source.droppableId];
//             const copiedItems = [...column.items];
//             const [removed] = copiedItems.splice(source.index, 1);
//             copiedItems.splice(destination.index, 0, removed);
//             setColumns({
//                 ...columns,
//                 [source.droppableId]: {
//                     ...column,
//                     items: copiedItems
//                 }
//             });
//             data = {
//                 ...columns,
//                 [source.droppableId]: {
//                     ...column,
//                     items: copiedItems
//                 }
//             }

//         }

//         updateTodo(data)
//     };

//     const [isAddTaskModalOpen, setAddTaskModal] = useState(false);
//     const [columns, setColumns] = useState({
//         requested: { name: "Requested", items: [] },
//         todo: { name: "To Do", items: [] },
//         inProgress: { name: "In Progress", items: [] },
//         done: { name: "Done", items: [] },
//     });
//     const [isRenderChange, setRenderChange] = useState(false);
//     const [isTaskOpen, setTaskOpen] = useState(false);
//     const [taskId, setTaskId] = useState(false);
//     const [title, setTitle] = useState('');
//     // const location = useLocation();
//     // const projectId = location.state.id;
//     console.log(window.location.pathname);
//     const { projectId } = window.location.pathname
//     // const navigate = useNavigate();
//     console.log(projectId);




//     useEffect(() => {
//         if (!isAddTaskModalOpen || isRenderChange) {
//             axios
//                 .get(`/project/${projectId}`)
//                 .then((res) => {

//                     const data = res.data.data.tasks;
//                     const tasks = data.task; // Access the `task` array directly
//                     console.log(data)
//                     console.log(tasks)

//                     setColumns({
//                         requested: {
//                             name: "Requested",
//                             items: tasks.filter((task) => task.stage === "Requested").sort((a, b) => a.order - b.order),

//                         },
//                         todo: {
//                             name: "To Do",
//                             items: tasks.filter((task) => task.stage === "To Do").sort((a, b) => a.order - b.order),
//                         },
//                         inProgress: {
//                             name: "In Progress",
//                             items: tasks.filter((task) => task.stage === "In Progress").sort((a, b) => a.order - b.order),
//                         },
//                         done: {
//                             name: "Done",
//                             items: tasks.filter((task) => task.stage === "Done").sort((a, b) => a.order - b.order),
//                         },
//                     });

//                     setTitle(data.name); // Assuming `name` refers to the project title
//                     setRenderChange(false);
//                 })
//                 .catch((error) => {
//                     toast.error("Something went wrong");
//                     console.error(error);
//                 });
//         }

//     }, [projectId, isAddTaskModalOpen, isRenderChange]);

//     const updateTodo = (data) => {
//         axios.put(`/project/${projectId}/todo`, data)
//             .then((res) => {
//             }).catch((error) => {
//                 toast.error('Something went wrong')
//             })
//     }

//     const handleDelete = (e, taskId) => {
//         e.stopPropagation();
//         axios.delete(`/project/${projectId}/task/${taskId}`)
//             .then((res) => {
//                 toast.success('Task is deleted')
//                 setRenderChange(true)
//             }).catch((error) => {
//                 toast.error('Something went wrong')
//             })
//     }

//     const handleTaskDetails = (id) => {
//         setTaskId({ projectId, id });
//         setTaskOpen(true);
//     }

//     // Calculate the number of tasks in each category for the pie chart
//     const getPieChartData = () => {
//         const totalTasks = columns.requested.items.length + columns.todo.items.length + columns.inProgress.items.length + columns.done.items.length;
//         const requestedPercent = (columns.requested.items.length / totalTasks) * 100;
//         const todoPercent = (columns.todo.items.length / totalTasks) * 100;
//         const inProgressPercent = (columns.inProgress.items.length / totalTasks) * 100;
//         const donePercent = (columns.done.items.length / totalTasks) * 100;

//         return {
//             labels: ['Requested', 'To Do', 'In Progress', 'Done'],
//             datasets: [
//                 {
//                     data: [requestedPercent, todoPercent, inProgressPercent, donePercent],
//                     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
//                     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
//                 },
//             ],
//         };
//     };

//     const getPieChartOptions = () => {
//         return {
//             responsive: true,
//             maintainAspectRatio: false, // Allows the chart to resize
//             plugins: {
//                 legend: {
//                     position: 'top',
//                     labels: {
//                         font: {
//                             size: 12,
//                         },
//                     },
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function (tooltipItem) {
//                             return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
//                         },
//                     },
//                 },
//             },
//             // Adjust the chart size to be more cohesive with the layout
//             aspectRatio: 1, // Optional: You can modify this for a perfect circle
//         };
//     };

//     return (
//         <div className='px-12 py-6 w-full'>
//             <div className="flex items-center justify-between mb-6">
//                 <h1 className='text-xl text-gray-800 flex justify-start items-center space-x-2.5'>
//                     <span>{title.slice(0, 25)}{title.length > 25 && '...'}</span>
//                     <ProjectDropdown id={projectId} />
//                 </h1>

//                 <BtnPrimary onClick={() => setAddTaskModal(true)}>Add todo</BtnPrimary>
//             </div>



//             <DragDropContext
//                 onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
//             >
//                 <div className="flex gap-5">
//                     {Object.entries(columns).map(([columnId, column]) => (
//                         <div key={columnId} className="w-3/12 h-[280px] ">
//                             <div className="pb-2.5 w-full flex justify-between">
//                                 <div className="inline-flex items-center space-x-2">
//                                     <h2 className="text-[#1e293b] font-medium text-sm uppercase leading-3">
//                                         {column.name}
//                                     </h2>
//                                     <span className={`h-5 inline-flex items-center justify-center px-2 mb-[2px] leading-none rounded-full text-xs font-semibold text-gray-500 border border-gray-300 ${column.items.length < 1 && 'invisible'}`}>
//                                         {column.items.length}
//                                     </span>
//                                 </div>
//                             </div> <div
//                                 className="overflow-y-auto"
//                                 style={{ maxHeight: '250px' }} // You can adjust the height as per your design
//                             >
//                                 <Droppable droppableId={columnId}>
//                                     {(provided, snapshot) => (
//                                         <div
//                                             {...provided.droppableProps}
//                                             ref={provided.innerRef}
//                                             className={`min-h-[530px] pt-4 duration-75 transition-colors border-t-2 border-indigo-400 ${snapshot.isDraggingOver && 'border-indigo-600'}`}
//                                         >
//                                             {column.items.map((item, index) => (
//                                                 <Draggable key={item._id} draggableId={item._id} index={index}>
//                                                     {(provided, snapshot) => (
//                                                         <div
//                                                             ref={provided.innerRef}
//                                                             {...provided.draggableProps}
//                                                             {...provided.dragHandleProps}
//                                                             style={{ ...provided.draggableProps.style }}
//                                                             onClick={() => handleTaskDetails(item._id)}
//                                                             className={`select-none px-3.5 pt-3.5 pb-2.5 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white relative ${snapshot.isDragging && 'shadow-md'}`}
//                                                         >
//                                                             <div className="pb-2">
//                                                                 <div className="flex item-center justify-between">
//                                                                     <h3 className="text-[#1e293b] font-medium text-sm capitalize">
//                                                                         {item.title.slice(0, 22)}{item.title.length > 22 && '...'}
//                                                                     </h3>
//                                                                     <DropdownMenu taskId={item._id} handleDelete={handleDelete} projectId={projectId} setRenderChange={setRenderChange} />
//                                                                 </div>
//                                                                 <p className="text-xs text-slate-500 leading-4 -tracking-tight">
//                                                                     {item.description.slice(0, 60)}{item.description.length > 60 && '...'}
//                                                                 </p>
//                                                                 <span className="py-1 px-2.5 bg-indigo-100 text-indigo-600 rounded-md text-xs font-medium mt-1 inline-block">
//                                                                     Task-{item.index}
//                                                                 </span>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </Draggable>
//                                             ))}
//                                             {provided.placeholder}
//                                         </div>
//                                     )}
//                                 </Droppable>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </DragDropContext>

//             {/* Pie Chart */}
//             <div className="mb-8 w-full" style={{ height: 400 }}>
//                 <Pie data={getPieChartData()} options={getPieChartOptions()} />
//             </div>

//             <AddTaskModal isAddTaskModalOpen={isAddTaskModalOpen} setAddTaskModal={setAddTaskModal} projectId={projectId} />
//             <TaskModal isOpen={isTaskOpen} setIsOpen={setTaskOpen} id={taskId} />
//         </div>
//     );
// }

// export default Task;


import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import AddTaskModal from "./AddTaskModal";
import BtnPrimary from './BtnPrimary'
import DropdownMenu from "./DropdownMenu";
import { useParams, useNavigate } from "react-router";
import ProjectDropdown from "./ProjectDropdown"
import axios from "axios";
import toast from "react-hot-toast";
import TaskModal from "./TaskModal";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

function Task() {

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        let data = {}
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            data = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
            data = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }

        }

        updateTodo(data)
    };

    const [isAddTaskModalOpen, setAddTaskModal] = useState(false);
    const [columns, setColumns] = useState({
        requested: { name: "Requested", items: [] },
        todo: { name: "To Do", items: [] },
        inProgress: { name: "In Progress", items: [] },
        done: { name: "Done", items: [] },
    });
    const [isRenderChange, setRenderChange] = useState(false);
    const [isTaskOpen, setTaskOpen] = useState(false);
    const [taskId, setTaskId] = useState(false);
    const [title, setTitle] = useState('');
    // const { projectId } = useParams();
    // console.log(projectId)
    // const navigate = useNavigate();



    // useEffect(() => {
    //     if (!isAddTaskModalOpen || isRenderChange) {
    //         axios
    //             .get(`/project/${projectId}`)
    //             .then((res) => {

    //                 const data = res.data.data.tasks;
    //                 const tasks = data.task; // Access the `task` array directly
    //                 console.log(data)
    //                 console.log(tasks)

    //                 setColumns({
    //                     requested: {
    //                         name: "Requested",
    //                         items: tasks.filter((task) => task.stage === "Requested").sort((a, b) => a.order - b.order),

    //                     },
    //                     todo: {
    //                         name: "To Do",
    //                         items: tasks.filter((task) => task.stage === "To Do").sort((a, b) => a.order - b.order),
    //                     },
    //                     inProgress: {
    //                         name: "In Progress",
    //                         items: tasks.filter((task) => task.stage === "In Progress").sort((a, b) => a.order - b.order),
    //                     },
    //                     done: {
    //                         name: "Done",
    //                         items: tasks.filter((task) => task.stage === "Done").sort((a, b) => a.order - b.order),
    //                     },
    //                 });

    //                 setTitle(data.name); // Assuming `name` refers to the project title
    //                 setRenderChange(false);
    //             })
    //             .catch((error) => {
    //                 toast.error("Something went wrong");
    //                 console.error(error);
    //             });
    //     }

    // }, [projectId, isAddTaskModalOpen, isRenderChange]);
    const { projectId: paramProjectId } = useParams();
    const [projectId, setProjectId] = useState(paramProjectId || localStorage.getItem('projectId') || null);

    useEffect(() => {
        if (paramProjectId) {
            localStorage.setItem('projectId', paramProjectId); // Update localStorage if projectId is in params
            setProjectId(paramProjectId); // Update state
        } else if (!projectId) {
            toast.error("Project ID is missing!");
        }
    }, [paramProjectId]);

    useEffect(() => {
        if (projectId) {
            axios
                .get(`/project/${projectId}`)
                .then((res) => {
                    console.log(res.data);

                    const data = res.data.data.tasks;
                    const tasks = data.task; // Access the `task` array
                    setColumns({
                        requested: {
                            name: "Requested",
                            items: tasks.filter((task) => task.stage === "Requested").sort((a, b) => a.order - b.order),
                        },
                        todo: {
                            name: "To Do",
                            items: tasks.filter((task) => task.stage === "To Do").sort((a, b) => a.order - b.order),
                        },
                        inProgress: {
                            name: "In Progress",
                            items: tasks.filter((task) => task.stage === "In Progress").sort((a, b) => a.order - b.order),
                        },
                        done: {
                            name: "Done",
                            items: tasks.filter((task) => task.stage === "Done").sort((a, b) => a.order - b.order),
                        },
                    });
                    setTitle(data.name); // Set project title
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                    console.error(error);
                });
        }
    }, [projectId]);

    const updateTodo = (data) => {
        axios.put(`/project/${projectId}/todo`, data)
            .then((res) => {
            }).catch((error) => {
                toast.error('Something went wrong')
            })
    }

    const handleDelete = (e, taskId) => {
        e.stopPropagation();
        axios.delete(`/project/${projectId}/task/${taskId}`)
            .then((res) => {
                toast.success('Task is deleted')
                setRenderChange(true)
            }).catch((error) => {
                toast.error('Something went wrong')
            })
    }

    const handleTaskDetails = (id) => {
        setTaskId({ projectId, id });
        setTaskOpen(true);
    }

    // Calculate the number of tasks in each category for the pie chart
    const getPieChartData = () => {
        const totalTasks = columns.requested.items.length + columns.todo.items.length + columns.inProgress.items.length + columns.done.items.length;
        const requestedPercent = (columns.requested.items.length / totalTasks) * 100;
        const todoPercent = (columns.todo.items.length / totalTasks) * 100;
        const inProgressPercent = (columns.inProgress.items.length / totalTasks) * 100;
        const donePercent = (columns.done.items.length / totalTasks) * 100;

        return {
            labels: ['Requested', 'To Do', 'In Progress', 'Done'],
            datasets: [
                {
                    data: [requestedPercent, todoPercent, inProgressPercent, donePercent],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
                },
            ],
        };
    };

    const getPieChartOptions = () => {
        return {
            responsive: true,
            maintainAspectRatio: false, // Allows the chart to resize
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12,
                        },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                        },
                    },
                },
            },
            // Adjust the chart size to be more cohesive with the layout
            aspectRatio: 1, // Optional: You can modify this for a perfect circle
        };
    };

    return (
        <div className='px-12 py-6 w-full'>
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-xl text-gray-800 flex justify-start items-center space-x-2.5'>
                    <span>{title.slice(0, 25)}{title.length > 25 && '...'}</span>
                    <ProjectDropdown id={projectId} />
                </h1>
                <BtnPrimary onClick={() => setAddTaskModal(true)}>Add todo</BtnPrimary>
            </div>



            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                <div className="flex gap-5">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div key={columnId} className="w-3/12 h-[280px] ">
                            <div className="pb-2.5 w-full flex justify-between">
                                <div className="inline-flex items-center space-x-2">
                                    <h2 className="text-[#1e293b] font-medium text-sm uppercase leading-3">
                                        {column.name}
                                    </h2>
                                    <span className={`h-5 inline-flex items-center justify-center px-2 mb-[2px] leading-none rounded-full text-xs font-semibold text-gray-500 border border-gray-300 ${column.items.length < 1 && 'invisible'}`}>
                                        {column.items.length}
                                    </span>
                                </div>
                            </div> <div
                                className="overflow-y-auto"
                                style={{ maxHeight: '250px' }} // You can adjust the height as per your design
                            >
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`min-h-[530px] pt-4 duration-75 transition-colors border-t-2 border-indigo-400 ${snapshot.isDraggingOver && 'border-indigo-600'}`}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style }}
                                                            onClick={() => handleTaskDetails(item._id)}
                                                            className={`select-none px-3.5 pt-3.5 pb-2.5 mb-2 border border-gray-200 rounded-lg shadow-sm bg-white relative ${snapshot.isDragging && 'shadow-md'}`}
                                                        >
                                                            <div className="pb-2">
                                                                <div className="flex item-center justify-between">
                                                                    <h3 className="text-[#1e293b] font-medium text-sm capitalize">
                                                                        {item.title.slice(0, 22)}{item.title.length > 22 && '...'}
                                                                    </h3>
                                                                    <DropdownMenu taskId={item._id} handleDelete={handleDelete} projectId={projectId} setRenderChange={setRenderChange} />
                                                                </div>
                                                                <p className="text-xs text-slate-500 leading-4 -tracking-tight">
                                                                    {item.description.slice(0, 60)}{item.description.length > 60 && '...'}
                                                                </p>
                                                                <span className="py-1 px-2.5 bg-indigo-100 text-indigo-600 rounded-md text-xs font-medium mt-1 inline-block">
                                                                    Task-{item.index}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {/* Pie Chart */}
            <div className="mb-8 w-full" style={{ height: 400 }}>
                <Pie data={getPieChartData()} options={getPieChartOptions()} />
            </div>

            <AddTaskModal isAddTaskModalOpen={isAddTaskModalOpen} setAddTaskModal={setAddTaskModal} projectId={projectId} />
            <TaskModal isOpen={isTaskOpen} setIsOpen={setTaskOpen} id={taskId} />
        </div>
    );
}

export default Task;