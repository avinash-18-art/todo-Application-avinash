const db = require('../database/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Function to create a new user
exports.createUser = (name, email, password, callback) => {
  // Generate a unique user ID
  const userId = uuidv4();

  // Hash the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback(err);
    }

    const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, name, email, hashedPassword], (err) => {
      if (err) {
        return callback(err);
      }

      callback(null, { id: userId, name, email });
    });
  });
};

// Function to find a user by email
exports.findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      return callback(err);
    }

    callback(null, user);
  });
};

// Function to find a user by ID
exports.findUserById = (id, callback) => {
  const query = `SELECT id, name, email FROM users WHERE id = ?`;
  db.get(query, [id], (err, user) => {
    if (err) {
      return callback(err);
    }

    callback(null, user);
  });
};

// Function to update a user's profile
exports.updateUserProfile = (userId, name, email, password, callback) => {
  // If password is provided, hash it before updating
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
      db.run(query, [name, email, hashedPassword, userId], function (err) {
        if (err) {
          return callback(err);
        }

        callback(null, this.changes);
      });
    });
  } else {
    // If no password, only update name and email
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(query, [name, email, userId], function (err) {
      if (err) {
        return callback(err);
      }

      callback(null, this.changes);
    });
  }
};

// Function to delete a user by ID
exports.deleteUser = (userId, callback) => {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [userId], function (err) {
    if (err) {
      return callback(err);
    }

    callback(null, this.changes);
  });
};
