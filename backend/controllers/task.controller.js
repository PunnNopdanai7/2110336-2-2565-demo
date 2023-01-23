const Task = require("../models/task.model");

//@desc     Get All task
//@route    Get /api/v1/tasks
//@access   Private
exports.getTasks = async (req, res, _next) => {
  console.log("Get all tasks");
  try {
    const tasks = await Task.find({
      createBy: req.user.id,
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);

    if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

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
  console.log("Get task by id");
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${req.params.id} not found`,
      });
    } else if (task.createBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorize to access this routes",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);

    if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Create new task
//@route    Post /api/v1/tasks
//@access   Private
exports.createTask = async (req, res, _next) => {
  console.log("Create new task");
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: "Please provide title and description",
      });
    }

    const task = await Task.create({
      title,
      description,
      createBy: req.user.id,
    });

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
    } else if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Update task
//@route    Put /api/v1/tasks/:id
//@access   Private
exports.updateTask = async (req, res, _next) => {
  console.log("Update task");

  try {
    const { title, description, completed } = req.body;
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${req.params.id} not found`,
      });
    } else if (task.createBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorize to access this routes",
      });
    } else if (!title || !description || !completed) {
      return res.status(400).json({
        success: false,
        error: "Please provide title, description and completed",
      });
    }

    const body = {
      title,
      description,
      completed,
      createdAt: task.createdAt,
      createBy: task.createBy,
    };

    const updatedTask = await Task.findByIdAndUpdate(id, body);
    return res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);

    if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Delete task
//@route    Delete /api/v1/tasks/:id
//@access   Private
exports.deleteTask = async (req, res, _next) => {
  console.log("Delete task");
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with id ${req.params.id} not found`,
      });
    } else if (task.createBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorize to access this routes",
      });
    }

    await task.remove();

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);

    if (error?.message) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
