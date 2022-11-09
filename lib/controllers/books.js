const { Router } = require('express');
const Book = require('../models/Book.js');

module.exports = Router().get('/', async (req, res) => {
  const allBook = await Book.getBooks();
  const filter = allBook.map(({ id, title, released }) => ({
    id,
    title,
    released,
  }));
  res.json(filter);
});
