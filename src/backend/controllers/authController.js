const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// Secret key for JWT (you can store this in an environment variable for better security)
const JWT_SECRET = 'your_jwt_secret_key';

// Controller function for user signup
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password before saving it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Generate a unique user ID
    const userId = uuidv4();

    // Insert the user into the database
    const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, name, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user' });
      }

      // Send a response indicating successful signup
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Controller function for user login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if all required fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find the user by email
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

      // Send the token back to the client
      res.json({ token });
    });
  });
};
