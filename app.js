const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

const { isAuthenticated, isAdmin } = require('./middleware/auth'); // Import middleware

const app = express();

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['secret-key'] }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use(require('./routes/auth'));
app.use('/books', isAuthenticated, require('./routes/books')); // Apply isAuthenticated
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
