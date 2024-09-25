const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Route to create a new task (POST request)
router.post('/', createTask);

// Route to get all tasks for the authenticated user (GET request)
router.get('/', getTasks);

// Route to update an existing task by its ID (PUT request)
router.put('/:id', updateTask);

// Route to delete a task by its ID (DELETE request)
router.delete('/:id', deleteTask);

module.exports = router;
