const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Adjust to the correct model name
    required: true
  },
  signIn: {
    type: String, // Store as a string in "HH:mm" format
    required: true
  },
  signOut: {
    type: String // Store as a string in "HH:mm" format
  },
  date: {
    type: Date, // Store the full date
    required: true
  },
  salary: {
    type: Number, // Store the full date
    required: true,
    get: v => parseFloat(v).toFixed(2), // Convert to fixed decimal format when retrieved
    set: v => parseFloat(v).toFixed(2) // Convert to fixed decimal format when set
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
