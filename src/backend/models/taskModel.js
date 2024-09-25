const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// Function to create a new task
exports.createTask = (userId, title, description, status = 'pending', callback) => {
  const taskId = uuidv4(); // Generate a unique task ID
  const query = `INSERT INTO tasks (id, userId, title, description, status) VALUES (?, ?, ?, ?, ?)`;
  const values = [taskId, userId, title, description, status];

  db.run(query, values, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: taskId, userId, title, description, status });
  });
};

// Function to get all tasks for a specific user
exports.getTasksByUserId = (userId, callback) => {
  const query = `SELECT * FROM tasks WHERE userId = ?`;
  
  db.all(query, [userId], (err, tasks) => {
    if (err) {
      return callback(err);
    }
    callback(null, tasks);
  });
};

// Function to get a specific task by task ID
exports.getTaskById = (taskId, userId, callback) => {
  const query = `SELECT * FROM tasks WHERE id = ? AND userId = ?`;
  
  db.get(query, [taskId, userId], (err, task) => {
    if (err) {
      return callback(err);
    }
    callback(null, task);
  });
};

// Function to update a task
exports.updateTask = (taskId, userId, title, description, status, callback) => {
  const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND userId = ?`;
  const values = [title, description, status, taskId, userId];

  db.run(query, values, function (err) {
    if (err) {
      return callback(err);
    }

    if (this.changes === 0) {
      return callback(new Error('Task not found or unauthorized'));
    }

    callback(null, { taskId, title, description, status });
  });
};

// Function to delete a task
exports.deleteTask = (taskId, userId, callback) => {
  const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;

  db.run(query, [taskId, userId], function (err) {
    if (err) {
      return callback(err);
    }

    if (this.changes === 0) {
      return callback(new Error('Task not found or unauthorized'));
    }

    callback(null, { message: 'Task deleted successfully' });
  });
};
