// import { number, string } from "joi";
const mongoose = require("mongoose");

const project = new mongoose.Schema({

    name: String,
    // unique: true // `email` must be unique

    description: String,
    task: [
        {
            id: Number,
            title: String,
            description: String,
            order: Number,
            stage: String,
            index: Number,
            // attachment: [
            //     { type: String, url: String }
            // ],
            // created_at: { type: Date, default: Date.now },
            // updated_at: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model('tasks', project);