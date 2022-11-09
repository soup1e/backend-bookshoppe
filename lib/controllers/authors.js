const { Router } = require('express');
const Author = require('../models/Author.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAuthors();
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getSingleAuthor(req.params.id);
    res.json(author);
  });
