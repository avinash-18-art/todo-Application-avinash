import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update with your backend API URL

// Signup function
const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Return user data (or token) on successful signup
  } catch (error) {
    throw new Error(error.response.data.message || 'Signup failed');
  }
};

// Login function
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Return user data (or token) on successful login
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed');
  }
};

// Function to get token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to set token in local storage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to remove token from local storage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Function to check if the user is logged in
const isLoggedIn = () => {
  const token = getToken();
  return token !== null;
};

// Export the authentication service functions
export default {
  signup,
  login,
  getToken,
  setToken,
  removeToken,
  isLoggedIn,
};
