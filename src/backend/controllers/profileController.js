const db = require('../database/db');
const bcrypt = require('bcryptjs');

// Controller function to get the authenticated user's profile
exports.getProfile = (req, res) => {
  const userId = req.user.id; // Extract user ID from JWT

  const query = `SELECT name, email FROM users WHERE id = ?`;
  
  db.get(query, [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving profile' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Return user's profile information
  });
};

// Controller function to update the authenticated user's profile
exports.updateProfile = (req, res) => {
  const userId = req.user.id; // Extract user ID from JWT
  const { name, email, password } = req.body;

  // Check if the required fields are provided
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // If the password is being updated, hash it
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
      db.run(query, [name, email, hashedPassword, userId], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating profile' });
        }
        res.json({ message: 'Profile updated successfully' });
      });
    });
  } else {
    // If no password change, update only name and email
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(query, [name, email, userId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating profile' });
      }
      res.json({ message: 'Profile updated successfully' });
    });
  }
};

// Controller function to delete the authenticated user's profile
exports.deleteProfile = (req, res) => {
  const userId = req.user.id; // Extract user ID from JWT

  const query = `DELETE FROM users WHERE id = ?`;

  db.run(query, [userId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting profile' });
    }

    res.json({ message: 'Profile deleted successfully' });
  });
};
