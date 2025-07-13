const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hoomo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hoomo API is running!' });
});

// Restaurant routes
app.use('/api/restaurants', require('./routes/restaurants'));
// Grocery routes
app.use('/api/grocery', require('./routes/grocery'));
// Clothes routes
app.use('/api/clothes', require('./routes/clothes'));
// Auth routes
app.use('/api/auth', require('./routes/auth'));
// Admin routes
app.use('/api/admin', require('./routes/admin'));
// Search route
app.use('/api/search', require('./routes/search'));
// Upload route
app.use('/api/upload', require('./routes/upload'));
// User route
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 