const express = require("express");

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
