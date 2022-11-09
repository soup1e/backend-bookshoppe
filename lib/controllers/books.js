const { Router } = require('express');
const Book = require('../models/Book.js');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const book = await Book.getSingleBook(req.params.id);
    res.json(book);
  })
  .get('/', async (req, res) => {
    const allBook = await Book.getBooks();
    const filter = allBook.map(({ id, title, released }) => ({
      id,
      title,
      released,
    }));
    res.json(filter);
  });
