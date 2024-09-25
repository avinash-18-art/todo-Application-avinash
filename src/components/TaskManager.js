import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import './TaskManager.css'; // Import the CSS file for styling

const TaskManager = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending'); // Default status

  const handleAddTask = (event) => {
    event.preventDefault();
    if (taskName.trim()) {
      onAddTask({ name: taskName, status: taskStatus });
      setTaskName(''); // Clear input field
      setTaskStatus('pending'); // Reset status
    }
  };

  return (
    <div className="task-manager-container">
      <h2>Task Manager</h2>

      <form onSubmit={handleAddTask} className="task-form">
        <div className="form-group">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Add a new task..."
            required
          />
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="add-task-button">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <p>No tasks available. Please add some!</p>
        )}
      </div>
    </div>
  );
};

TaskManager.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskManager;
