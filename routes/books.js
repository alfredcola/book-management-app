const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isAdmin } = require('../middleware/auth'); // Import isAdmin

router.get('/', async (req, res) => {
  try {
    const { title, author, year, genre } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (year) query.year = parseInt(year);
    if (genre) query.genre = { $regex: genre, $options: 'i' };

    const books = await Book.find(query);
    res.render('books', { books, searchQuery: req.query, role: req.session.role });
  } catch (err) {
    res.status(500).send('Error fetching books: ' + err.message);
  }
});

router.get('/new', isAdmin, (req, res) => {
  res.render('newBook', { book: null, errors: null });
});

router.post('/', isAdmin, async (req, res) => {
  const { title, author, year, genre } = req.body;

  const errors = [];
  if (!title) errors.push('Title is required');
  if (!author) errors.push('Author is required');

  if (errors.length > 0) {
    res.render('newBook', { book: { title, author, year, genre }, errors });
  } else {
    try {
      const newBook = new Book({ title, author, year, genre });
      await newBook.save();
      res.redirect('/books');
    } catch (err) {
      res.status(500).send('Error saving book: ' + err.message);
    }
  }
});

router.get('/:id/edit', isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.render('editBook', { book, errors: null });
  } catch (err) {
    res.status(500).send('Error fetching book: ' + err.message);
  }
});

router.post('/:id', isAdmin, async (req, res) => {
  const { title, author, year, genre } = req.body;

  const errors = [];
  if (!title) errors.push('Title is required');
  if (!author) errors.push('Author is required');

  if (errors.length > 0) {
    res.render('editBook', { book: { _id: req.params.id, title, author, year, genre }, errors });
  } else {
    try {
      await Book.findByIdAndUpdate(req.params.id, { title, author, year, genre });
      res.redirect('/books');
    } catch (err) {
      res.status(500).send('Error updating book: ' + err.message);
    }
  }
});

router.post('/:id/delete', isAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    res.status(500).send('Error deleting book: ' + err.message);
  }
});

module.exports = router;
