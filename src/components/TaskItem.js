import React from 'react';
import PropTypes from 'prop-types';
import './TaskItem.css'; 

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleStatusChange = (event) => {
    const updatedTask = {
      ...task,
      status: event.target.value,
    };
    onUpdate(updatedTask);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="task-item">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <select value={task.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="done">Done</option>
        </select>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
