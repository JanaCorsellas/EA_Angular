const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());
app.use(cors());

const LOCAL_PORT = process.env.SERVER_PORT || 9000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Angular', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.error('DB Connection Error:', error));

// User schema and model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
  res.send({ token });
});

// Get all users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    console.log('Users fetched:', users);
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});

app.listen(LOCAL_PORT, () => {
  console.log(`Server is running on port ${LOCAL_PORT}`);
});