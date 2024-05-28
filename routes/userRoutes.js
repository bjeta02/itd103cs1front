// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    position: req.body.position,
    username: req.body.username,
    email: req.body.email,
    salary: req.body.salary
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD routes (PUT, DELETE) can be implemented similarly

module.exports = router;
