const express = require("express");
const joi = require('joi');
const mongoose = require('mongoose');
const Project = require('../Models/task.js')

const api = express.Router()

// api.get('/projects', async (req, res) => {
//     try {
//         const data = await Project.find({}, { task: 0, __v: 0, updatedAt: 0 })
//         return res.send(data)
//     } catch (error) {
//         return res.send(error)
//     }
// })
api.get('/projects', async (req, res) => {
    try {
        // Access the `members` collection directly
        const data = await mongoose.connection.db.collection('tasks').find({}).toArray();
        console.log(data);
        console.log("Current DB:", mongoose.connection.db.databaseName);
        return res.status(200).send(data);
    } catch (error) {
        // console.log("jjjjjjjjjjjjjj")
        console.error("Error fetching members:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

api.get('/projects/overall', async (req, res) => {
    try {
        // Fetch all members from the collection
        const members = await Member.find({});

        // Check if there are no members
        if (!members || members.length === 0) {
            return res.status(404).json({
                data: { error: true, message: 'No projects found' },
            });
        }

        // Aggregate tasks from all projects
        let allTasks = [];

        // Traverse through each member and get their project tasks
        for (const member of members) {
            // Assuming each member has a `tasks` array in their data
            const tasks = member.tasks || []; // If tasks are in the `tasks` field
            allTasks = [...allTasks, ...tasks]; // Add the tasks to the aggregated array
        }

        // Send the aggregated tasks in the response
        return res.status(200).json({
            data: { error: false, tasks: allTasks },
        });
    } catch (error) {
        console.error('Error fetching tasks from all projects:', error);

        // Handle any unexpected errors
        return res.status(500).json({
            data: { error: true, message: 'Something went wrong' },
        });
    }
});


api.get('/project/:id', async (req, res) => {
    const projectId = req.params.id;
    console.log(projectId)
    // Validate the project ID
    if (!projectId) {
        return res.status(422).json({
            data: { error: true, message: 'Project ID is required' },
        });
    }

    try {
        // Check if the provided project ID is valid
        console.log("hello")
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            console.log("hiw worng")
            return res.status(400).json({
                data: { error: true, message: 'Invalid Project ID' },
            });
        }

        // Use a proper Mongoose model to fetch the project
        // const ProjectModel = mongoose.model('members', new mongoose.Schema({
        //     task: Array, // Define the schema fields you expect
        //     // Add other fields if required
        // }));

        // Fetch the project by its ID using `findById`
        const project = await Project.findById(projectId);
        console.log(project)
        // If the project is not found, send a 404 response
        if (!project) {
            return res.status(404).json({
                data: { error: true, message: 'Project not found' },
            });
        }

        // Retrieve tasks from the project (assumes `task` field exists in the document)
        const tasks = project;
        // console.log(tasks)
        // Send the tasks in the response
        return res.status(200).json({
            data: { error: false, tasks },
        });
    } catch (error) {
        console.error('Error fetching project tasks:', error);

        // Handle any unexpected errors
        return res.status(500).json({
            data: { error: true, message: 'Something went wrong' },
        });
    }
});

// api.get('/project/:id', async (req, res) => {
//     const projectId = req.params.id;
//     console.log(projectId)
//     // Validate the project ID
//     if (!projectId) {
//         return res.status(422).json({
//             data: { error: true, message: 'Project ID is required' },
//         });
//     }

//     try {
//         // Check if the provided project ID is valid
//         if (!mongoose.Types.ObjectId.isValid(projectId)) {
//             console.log("hiw worng")
//             return res.status(400).json({
//                 data: { error: true, message: 'Invalid Project ID' },
//             });
//         }

//         // Use a proper Mongoose model to fetch the project
//         // const ProjectModel = mongoose.model('members', new mongoose.Schema({
//         //     task: Array, // Define the schema fields you expect
//         //     // Add other fields if required
//         // }));

//         // Fetch the project by its ID using `findById`
//         const project = await Project.findById(projectId);
//         // console.log(project)
//         // If the project is not found, send a 404 response
//         if (!project) {
//             return res.status(404).json({
//                 data: { error: true, message: 'Project not found' },
//             });
//         }

//         // Retrieve tasks from the project (assumes `task` field exists in the document)
//         const tasks = project;
//         // console.log(tasks)
//         // Send the tasks in the response
//         return res.status(200).json({
//             data: { error: false, tasks },
//         });
//     } catch (error) {
//         console.error('Error fetching project tasks:', error);

//         // Handle any unexpected errors
//         return res.status(500).json({
//             data: { error: true, message: 'Something went wrong' },
//         });
//     }
// });

// api.post('/project', async (req, res) => {

//     // validate type 
//     const project = joi.object({
//         name: joi.string().min(3).max(30).required(),
//         description: joi.string().required(),
//     })

//     // validation
//     const { error, value } = project.validate({ name: req.body.title, description: req.body.description });
//     if (error) return res.status(422).send(error)


//     // insert data 
//     try {
//         const data = await new Project(value).save()
//         res.send({ data: { name: data.title, description: data.description, updatedAt: data.updatedAt, _id: data._id } })

//     } catch (e) {
//         if (e.code === 11000) {
//             return res.status(422).send({ data: { error: true, message: 'title must be unique' } })
//         } else {
//             return res.status(500).send({ data: { error: true, message: 'server error' } })
//         }
//     }


// })


api.post('/project', async (req, res) => {
    // Validate the incoming project data
    const projectSchema = joi.object({
        name: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    // Validation
    const { error, value } = projectSchema.validate({
        name: req.body.name,
        description: req.body.description,
    });

    if (error) return res.status(422).send(error.details);

    // Insert data into the database
    try {
        // Create a new project with an empty task array
        const newProject = new Project({
            name: value.name,
            description: value.description,
            task: []  // Empty array for tasks
        });

        const savedProject = await newProject.save();

        res.status(201).send({
            data: {
                name: savedProject.name,
                description: savedProject.description,
                task: savedProject.task,
                updatedAt: savedProject.updatedAt,
                _id: savedProject._id,
            },
        });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(422).send({ data: { error: true, message: 'Project name must be unique' } });
        } else {
            return res.status(500).send({ data: { error: true, message: 'Server error' } });
        }
    }
});
api.put('/project/:id', async (req, res) => {
    // validate type 
    const project = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    })

    // // validation
    const { error, value } = project.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error)

    Project.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { ...value }, { upsert: true }, (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })


})

api.delete('/project/:id', async (req, res) => {
    try {
        const data = await Project.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        res.send(data)
    } catch (error) {
        res.send(error)
    }

})
// api.delete('/project/:id', async (req, res) => {
//     try {
//         // Check if projectId exists in the request parameters
//         const projectId = req.params.id;

//         // If no projectId is provided, send an error response
//         if (!projectId) {
//             return res.status(400).send('Project ID is required');
//         }

//         console.log('Attempting to delete project with ID:', projectId);  // Debugging log

//         // Attempt to delete the project from the database
//         const result = await Project.deleteOne({ _id: mongoose.Types.ObjectId(projectId) });

//         // If no documents were deleted, the project was not found
//         if (result.deletedCount === 0) {
//             console.log('No project found to delete with ID:', projectId);  // Debugging log
//             return res.status(404).send({ deletedCount: 0 });
//         }

//         console.log('Project successfully deleted with ID:', projectId);  // Debugging log
//         // Send a success response if the project was deleted
//         return res.status(200).send({ deletedCount: result.deletedCount });
//     } catch (error) {
//         console.error('Error during deletion:', error);  // Debugging log
//         return res.status(500).send('Server error');
//     }
// });
//  task api   

api.post('/project/:id/task', async (req, res) => {


    if (!req.params.id) return res.status(500).send(`server error`);

    // validate type 
    const task = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    })

    const { error, value } = task.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error)

    try {
        // const task = await Project.find({ _id: mongoose.Types.ObjectId(req.params.id) }, { "task.index": 1 })
        const [{ task }] = await Project.find({ _id: mongoose.Types.ObjectId(req.params.id) }, { "task.index": 1 }).sort({ 'task.index': 1 })


        let countTaskLength = [task.length, task.length > 0 ? Math.max(...task.map(o => o.index)) : task.length];

        const data = await Project.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: { task: { ...value, stage: "Requested", order: countTaskLength[0], index: countTaskLength[1] + 1 } } })
        return res.send(data)
    } catch (error) {
        return res.status(500).send(error)
    }
})

api.get('/project/:id/task/:taskId', async (req, res) => {

    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    // res.send(req.params)
    try {

        let data = await Project.find(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
                task: {
                    $filter: {
                        input: "$task",
                        as: "task",
                        cond: {
                            $in: [
                                "$$task._id",
                                [
                                    mongoose.Types.ObjectId(req.params.taskId)
                                ]
                            ]
                        }
                    }
                }
            })
        if (data[0].task.length < 1) return res.status(404).send({ error: true, message: 'record not found' })
        return res.send(data)
    } catch (error) {
        return res.status(5000).send(error)
    }


})
// api.get('/project/:projectId/task/:taskId', async (req, res) => {
//     const { projectId, taskId } = req.params;

//     // Validate the projectId and taskId
//     if (!mongoose.Types.ObjectId.isValid(projectId) || isNaN(taskId)) {
//         return res.status(400).send('Invalid Project ID or Task ID');
//     }

//     try {
//         const project = await Project.findOne({
//             _id: mongoose.Types.ObjectId(projectId),

//             'task.id': parseInt(taskId)  // Match the task.id as a number
//         });

//         if (!project) {
//             return res.status(404).send('Project or Task not found');
//         }

//         const task = project.task.find(t => t.id === parseInt(taskId));  // Ensure the ID is compared as a number
//         return res.json({ task });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     }
// });

api.put('/project/:id/task/:taskId', async (req, res) => {

    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    const task = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    })

    const { error, value } = task.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error)

    try {
        const data = await Project.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: mongoose.Types.ObjectId(req.params.taskId) } }
        }, { $set: { "task.$.title": value.title, "task.$.description": value.description } })
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }

})

// api.delete('/project/:id/task/:taskId', async (req, res) => {
//     // Ensure projectId and taskId are provided
//     if (!req.params.id || !req.params.taskId) {
//         return res.status(400).send('Project ID and Task ID are required');
//     }

//     try {
//         // Attempt to delete the task from the project
//         const result = await Project.updateOne(
//             { _id: mongoose.Types.ObjectId(req.params.id) },
//             { $pull: { tasks: { _id: mongoose.Types.ObjectId(req.params.taskId) } } }
//         );

//         // If no documents were modified, the task might not exist
//         if (result.modifiedCount === 0) {
//             return res.status(404).send('Task not found');
//         }

//         // Successfully deleted the task
//         return res.status(200).send('Task successfully deleted');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Server error');
//     }
// });
api.delete('/project/:id/task/:taskId', async (req, res) => {
    const { id: projectId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).send('Invalid Project ID');
    }

    try {
        // Use taskId (index or order) to match and remove the task from the array
        const result = await Project.updateOne(
            { _id: mongoose.Types.ObjectId(projectId) },
            { $pull: { tasks: { index: parseInt(taskId) } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send('Task not found');
        }

        return res.status(200).send('Task successfully deleted from the project');
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).send('Server error while deleting task');
    }
});

api.put('/project/:id/todo', async (req, res) => {
    let todo = []

    for (const key in req.body) {
        // todo.push({ items: req.body[key].items, name: req.body[key]?.name })
        for (const index in req.body[key].items) {
            req.body[key].items[index].stage = req.body[key].name
            todo.push({ name: req.body[key].items[index]._id, stage: req.body[key].items[index].stage, order: index })
        }
    }

    todo.map(async (item) => {
        await Project.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: mongoose.Types.ObjectId(item.name) } }
        }, { $set: { "task.$.order": item.order, "task.$.stage": item.stage } })
    })

    res.send(todo)
})

module.exports = api