const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/userInfo')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

const userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  password: String,
});

const emailSchema = new mongoose.Schema({
  emailId: String,
  emailTitle: String,
  emailBody: String,
  to: String,
  sendDate: Date,
}, { collection: 'emailTable' }); // Specify the collection name for emailSchema

const User = mongoose.model('User', userSchema, 'userTable');
const Email = mongoose.model('Email', emailSchema, 'emailTable'); // Use 'emailTable' collection for emails

app.get('/emails', async (req, res) => {
  try {
    const emailData = await Email.find({});
    res.json(emailData);
  } catch (err) {
    res.status(500).send('Error fetching email data');
  }
});

app.post('/emails', async (req, res) => {
  try {
    const { emailId, emailTitle, emailBody, to, sendDate } = req.body;
    const newEmail = new Email({ emailId, emailTitle, emailBody, to, sendDate });
    await newEmail.save();
    res.status(201).json({ message: 'Email created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating email' });
  }
});

app.get('/', async (req, res) => {
  try {
    const userData = await User.find({});
    res.json(userData);
  } catch (err) {
    res.status(500).send('Error fetching user data');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { userId, userName, password } = req.body;
    const newUser = new User({ userId, userName, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});