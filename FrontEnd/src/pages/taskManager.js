import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import Task from '../components/taskManager/Task'; // Adjust path as necessary
import AppLayout from '../components/taskManager/AppLayout'; // Adjust path as necessary
import { Toaster } from 'react-hot-toast';
import Sidebar from '../components/taskManager/Sidebar'


// function TaskManager() {
//     console.log('render app..');
//     return (
//         // <AppLayout>
//         //     <Toaster position="top-right" gutter={8} />
//         //     <Routes>
//         //         {/* Nested Route for /tasks/:projectId */}
//         //         {/* <Route path=":projectId" element={<Task />} /> */}
//         //         {/* Default Route for /tasks */}
//         //         <Route
//         //             path="/"
//         //             element={
//         //                 <div className="flex flex-col items-center w-full pt-10">
//         //                     <img src="./image/welcome.svg" className="w-5/12" alt="" />
//         //                     <h1 className="text-lg text-gray-600">Select or create new project</h1>
//         //                 </div>
//         //             }
//         //         />
//         //     </Routes>
//         // </AppLayout>
//         <div className='bg-white'>
//             <div className='bg-white shadow h-14'></div>
//             <div className=' w-screen flex container mx-auto' style={{ height: 'calc(100vh - 56px)' }}>
//                 <div className="w-[220px]">
//                     <Sidebar />
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default TaskManager;

function TM({ showDetails }) {
    console.log("render TM..");
    return (
        <AppLayout>
            <Toaster position="top-right" gutter={8} />
            {showDetails ? (
                // Task Details Page
                <Task />
            ) : (
                // Task List Page
                <Welcome />
            )}
        </AppLayout>
    );
}

function Welcome() {
    return (
        <div className="flex flex-col items-center w-full pt-10">
            <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
            <h1 className="text-lg text-gray-600">Select or create a new project</h1>
        </div>
    );
}

export default TM;
