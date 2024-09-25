const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const router = express.Router();

// Route to get the current user's profile (GET request)
router.get('/', getProfile);

// Route to update the current user's profile (PUT request)
router.put('/', updateProfile);

// Route to delete the current user's profile (DELETE request)
router.delete('/', deleteProfile);

module.exports = router;
