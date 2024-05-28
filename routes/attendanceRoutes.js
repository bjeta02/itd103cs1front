// attendanceRoutes.js

const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// GET all attendance records with user information populated
router.get('/attendances', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('user');
    console.log(attendanceRecords);
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new attendance record
router.post('/new/attendance/', async (req, res) => {
  const attendance = new Attendance({
    name: req.body.name,
    signIn: req.body.signIn,
    signOut: req.body.signOut,
    date: req.body.date
  });

  try {
    const newAttendanceRecord = await attendance.save();
    res.status(201).json(newAttendanceRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Add more routes for other CRUD operations as needed

module.exports = router;
