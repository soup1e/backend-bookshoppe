const { Router } = require('express');
const Author = require('../models/Author.js');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAuthors();
    const filter = authors.map(({ id, name, dob, pob }) => ({
      id,
      name,
      dob,
      pob,
    }));
    res.json(filter);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getSingleAuthor(req.params.id);
    res.json(author);
  });
