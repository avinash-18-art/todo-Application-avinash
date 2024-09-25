const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// Controller function to create a new task
exports.createTask = (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT
  const { title, description, status } = req.body;

  // Check if all required fields are provided
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  // Generate a unique task ID
  const taskId = uuidv4();

  const query = `INSERT INTO tasks (id, userId, title, description, status) VALUES (?, ?, ?, ?, ?)`;
  const values = [taskId, userId, title, description, status || 'pending'];

  db.run(query, values, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating task' });
    }
    res.status(201).json({ message: 'Task created successfully', taskId });
  });
};

// Controller function to get all tasks for the authenticated user
exports.getTasks = (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT

  const query = `SELECT * FROM tasks WHERE userId = ?`;

  db.all(query, [userId], (err, tasks) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks' });
    }

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.json(tasks);
  });
};

// Controller function to update a task
exports.updateTask = (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT
  const { id } = req.params; // Get task ID from URL
  const { title, description, status } = req.body;

  // Ensure task ID is provided in the URL
  if (!id) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND userId = ?`;
  const values = [title, description, status, id, userId];

  db.run(query, values, function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error updating task' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task updated successfully' });
  });
};

// Controller function to delete a task
exports.deleteTask = (req, res) => {
  const userId = req.user.id; // Get the user ID from the JWT
  const { id } = req.params; // Get task ID from URL

  const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;

  db.run(query, [id, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting task' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  });
};
