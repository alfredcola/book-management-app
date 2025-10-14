const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 讀取 (GET)
router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 建立 (POST)
router.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// 更新 (PUT)
router.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// 刪除 (DELETE)
router.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: '已刪除' });
});

module.exports = router;
