const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const AttendanceModel = require('./Attendee');

var cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

function parseTime(timeString, date) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const parsedDate = new Date(date);
  parsedDate.setHours(hours, minutes, 0, 0); // Setting time with hours and minutes
  return parsedDate;
}

app.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/get/:id', (req, res) => {
  
  const id = req.params.id;
  User.findById(id) // Updated
    .then(post => res.json(post))
    .catch(err => console.log(err))
});

app.post('/create', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true }) // Updated
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id) // Updated
      .then(response => res.json(response))
      .catch(err => res.json(err))
});

// app.get('/attendances', (req, res) => {
//   AttendanceModel.find()
//       .then(attendances => res.json(attendances))
//       .catch(err => res.json(err))
// });

app.post('/attendances/:id', async (req, res) => {
  const { user, signIn, signOut, date, salary } = req.body;

  // Log the incoming request data
  console.log('Received Data:', { user, signIn, signOut, date, salary });

  try {
    // Validate required fields
    if (!user || !signIn || !date) {
      return res.status(400).json({ error: 'Missing required fields: user, signIn, or date' });
    }

    // Parse the date into a JavaScript Date object
    const attendanceDate = new Date(date);

    // Attempt to update or create an attendance record
    const updatedAttendance = await AttendanceModel.findOneAndUpdate(
      { user, date: attendanceDate },
      { signIn, signOut, date: attendanceDate, user, salary },
      { new: true, upsert: true }
    );

    // Check if the update was successful
    if (!updatedAttendance) {
      return res.status(500).json({ error: 'Failed to update or create attendance record' });
    }

    res.json(updatedAttendance);
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error saving attendance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all attendance records with user information populated
app.get('/attendances', async (req, res) => {
  try {
    const attendanceRecords = await AttendanceModel.find().populate('user');
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/total-salary', async (req, res) => {
  const currentYear = new Date().getFullYear(); // Get the current year

  try {
    const totalSalaries = [];

    // Loop through each month
    for (let month = 1; month <= 12; month++) {
      // Get all attendance records for the specified month and year
      const startDate = new Date(`${currentYear}-${month}-01`);
      const endDate = new Date(`${currentYear}-${month}-31`);
      const attendanceRecords = await AttendanceModel.find({
        date: { $gte: startDate, $lte: endDate }
      });

      // Calculate total salary for the month
      let totalSalaryForMonth = 0;
      attendanceRecords.forEach(record => {
        console.log(record.salary);
        totalSalaryForMonth += parseFloat(record.salary);
      });

      // Add total salary for the month to the array
      totalSalaries.push({ month, totalSalaryForMonth });
    }

    res.json(totalSalaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/total-users', async (req, res) => {
  try {
    // Query the users collection to count the total number of documents
    const totalUsers = await User.countDocuments();

    // Send the total count as a response
    res.json({ totalUsers });
  } catch (error) {
    console.error('Failed to fetch total number of users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/user-count-by-position', async (req, res) => {
  try {
    const countByPosition = await User.aggregate([
      { $group: { _id: '$position', count: { $sum: 1 } } }
    ]);
    res.json(countByPosition);
  } catch (error) {
    console.error('Error counting users by position:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
