// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes'); // Import attendance routes

const app = express();

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodeexpressdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes); // Use attendance routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
