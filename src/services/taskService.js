import axios from 'axios';
import authService from './authService'; // Import the authService to get the token

const API_URL = 'http://localhost:5000/api/tasks'; // Update with your backend API URL

// Create a new task
const createTask = async (taskData) => {
  const token = authService.getToken();
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the created task data
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to create task');
  }
};

// Get all tasks
const getTasks = async () => {
  const token = authService.getToken();
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the list of tasks
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch tasks');
  }
};

// Update an existing task
const updateTask = async (taskId, taskData) => {
  const token = authService.getToken();
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the updated task data
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update task');
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  const token = authService.getToken();
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return success message or confirmation
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to delete task');
  }
};

// Export the task service functions
export default {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
