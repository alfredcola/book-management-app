const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching books: ' + err.message });
  }
});

router.post('/books', async (req, res) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  try {
    const book = new Book({ title, author, year, genre });
    await book.save();
    res.status(201).json(book); 
  } catch (err) {
    res.status(500).json({ error: 'Error saving book: ' + err.message });
  }
});

router.put('/books/:id', async (req, res) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year, genre },
      { new: true, runValidators: true } 
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error updating book: ' + err.message });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: '已刪除' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting book: ' + err.message });
  }
});

module.exports = router;
