const Task = require("../models/task.model");

//@desc     Get All task
//@route    Get /api/v1/tasks
//@access   Private
exports.getTasks = async (req, res, _next) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Get Single task by ID
//@route    Get /api/v1/tasks/:id
//@access   Private
exports.getTask = async (req, res, _next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No task found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Create new task
//@route    Post /api/v1/tasks
//@access   Private
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    if (error?.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

//@desc     Update task
//@route    Put /api/v1/tasks/:id
//@access   Private
exports.updateTask = async (req, res, _next) => {};

//@desc     Delete task
//@route    Delete /api/v1/tasks/:id
//@access   Private
exports.deleteTask = async (req, res, _next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "No task found",
      });
    }

    await task.remove();

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
