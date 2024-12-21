const ProjectRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

ProjectRoutes.get("/getProject", async (req, res) => {
  const { _id } = 'sanskar'
  const newProject = new dataModel({
    _id: _id,
  });
  let Project = await dataModel.findById(_id);
  if (!Project) Project = await newProject.save();
  console.log(Project.Projects);
  res.json(Project.Projects);
});

ProjectRoutes.post("/postProject", async (req, res) => {
  const { _id } = req.user;
  const newProject = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { Projects: newProject } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

ProjectRoutes.patch("/updateProject/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "Projects.id": id },
      {
        $set: {
          "Projects.$.done": done,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

ProjectRoutes.delete("/deleteProject/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { Projects: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = ProjectRoutes;
