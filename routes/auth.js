const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    req.session.userId = user._id.toString();
    req.session.role = user.role; // Store role in session
    res.redirect('/books');
  } catch (err) {
    console.error('Login error:', err.message);
    res.render('login', { error: 'An error occurred. Please try again.' });
  }
});

router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

    const user = new User({ username, password, role: role || 'reader' }); // Default to reader if no role specified
    await user.save();

    req.session.userId = user._id.toString();
    req.session.role = user.role;
    res.redirect('/books');
  } catch (err) {
    console.error('Registration error:', err.message);
    res.render('register', { error: 'An error occurred. Please try again.' });
  }
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = router;
