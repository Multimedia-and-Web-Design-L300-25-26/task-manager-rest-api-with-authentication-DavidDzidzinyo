import mongoose from "mongoose";
import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description = "", completed = false } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      completed,
      user: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
