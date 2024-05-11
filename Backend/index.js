const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');
const authRouters = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', noteRoutes);
app.use('/api/auth', authRouters);

// db connection
mongoose
  .connect(
    'mongodb+srv://fawad7998:fawad6035@cluster0.urediab.mongodb.net/Testing?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('db is connected');
  })
  .catch((err) => {
    console.log(err, 'connection error');
  });

// Server create
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
