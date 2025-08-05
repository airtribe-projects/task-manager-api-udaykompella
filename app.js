const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const res = fs.readFile("./task.json", "utf-8", (err, res) => {
  if (err) {
    console.log(err, "Error while reading tasks file");
  }
  return res;
});
const data = JSON.parse(res);
app.get("/tasks", async (req, res) => {
  try {
    return res.status(200).send(data.tasks);
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Unable to parse file",
    });
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let getRecord = data.tasks.find((record) => record.id == id);
    if (!getRecord) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).send(getRecord);
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Unable to parse file",
    });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const newTask = req.body;
    if (
      !newTask.title ||
      !newTask.description ||
      newTask.completed === undefined
    ) {
      return res.status(400).send("Invalid data");
    }
    let newData = { ...data };
    newData.tasks.push(newTask);
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Unable to process request",
    });
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let expectedTask = req.body;
    let getRecord = data.tasks.find((record) => record.id == id);
    if (!getRecord) {
      return res.status(404).json({ message: "id not found" });
    } else if (
      !expectedTask.title ||
      !expectedTask.description ||
      typeof expectedTask.completed !== "boolean"
    ) {
      return res.status(400).send("Invalid data to update");
    } else {
      const findIndex = data.tasks.indexOf(getRecord);
      let newData = { ...data.tasks };
      newData[findIndex].title = expectedTask.title;
      newData[findIndex].description = expectedTask.description;
      newData[findIndex].completed = expectedTask.completed;
      return res.status(200).send(newData);
    }
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Unable to parse file",
    });
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deleteRecord = data.tasks.find((record) => record.id == id);
    if (!deleteRecord) {
      return res.status(404).json({ message: "id not found" });
    }
    let getRecord = data.tasks.filter((record) => record.id != id);
    return res.status(200).send(getRecord);
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Unable to parse file",
    });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
