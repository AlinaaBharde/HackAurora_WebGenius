import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Task from '../components/taskManager/Task'; // Adjust path as necessary
import AppLayout from '../components/taskManager/AppLayout'; // Adjust path as necessary
import { Toaster } from 'react-hot-toast';
import Sidebar from '../components/taskManager/Sidebar';
import { useLocation } from 'react-router-dom';
function TaskManager() {
    console.log('render app..');
    const location = useLocation();

    const projectId = location.state.id;
    return (
        // <AppLayout>
        //     <Toaster position="top-right" gutter={8} />
        //     <Routes>
        //         {/* Nested Route for /tasks/:projectId */}
        //         {/* <Route path=":projectId" element={<Task />} /> */}
        //         {/* Default Route for /tasks */}
        //         <Route
        //             path="/"
        //             element={
        //                 <div className="flex flex-col items-center w-full pt-10">
        //                     <img src="./image/welcome.svg" className="w-5/12" alt="" />
        //                     <h1 className="text-lg text-gray-600">Select or create new project</h1>
        //                 </div>
        //             }
        //         />
        //     </Routes>
        // </AppLayout>
        <div className='bg-white'>
            <div className='bg-white shadow h-14'></div>
            <div className=' w-screen flex container mx-auto' style={{ height: 'calc(100vh - 56px)' }}>
                <div className="w-[220px]">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <div className="flex">
                        <Task projectId={projectId} />
                    </div>p
                </div>
            </div>
        </div>
    );
}

export default TaskManager;
