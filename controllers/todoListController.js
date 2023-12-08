"use strict";

var mongoose = require("mongoose"),
  Task = mongoose.model("Tasks");

exports.listAllTasks = async function (req, res) {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createTask = async function (req, res) {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.readTask = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.updateTask = async function (req, res) {
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }).exec();

    res.json(updatedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteTask = async function (req, res) {
  try {
    const result = await Task.deleteOne({ _id: req.params.taskId });

    if (result.deletedCount > 0) {
      res.json({ message: "Task successfully deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
