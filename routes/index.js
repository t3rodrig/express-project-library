const express = require('express');
const router  = express.Router();

const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      console.log('Retrived books from DB:', books);
      res.render('books', {books});
    })
    .catch(err => console.log('Error while getting the books from DB:', err));
});

module.exports = router;
