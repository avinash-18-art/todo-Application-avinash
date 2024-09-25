import axios from 'axios';
import authService from './authService'; // Import the authService to get the token

const API_URL = 'http://localhost:5000/api/profile'; // Update with your backend API URL

// Fetch user profile
const getProfile = async () => {
  const token = authService.getToken();
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the user profile data
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch profile');
  }
};

// Update user profile
const updateProfile = async (userData) => {
  const token = authService.getToken();
  try {
    const response = await axios.put(`${API_URL}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return the updated user profile data
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to update profile');
  }
};

// Delete user profile
const deleteProfile = async () => {
  const token = authService.getToken();
  try {
    const response = await axios.delete(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data; // Return success message or confirmation
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to delete profile');
  }
};

// Export the profile service functions
export default {
  getProfile,
  updateProfile,
  deleteProfile,
};
