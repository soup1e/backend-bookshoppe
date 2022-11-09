const { Router } = require('express');
const Author = require('../models/Author.js');

module.exports = Router().get('/', async (req, res) => {
  const authors = await Author.getAuthors();
  res.json(authors);
});
