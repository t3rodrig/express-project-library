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
      // console.log('Retrived books from DB:', books);
      res.render('books', {books});
    })
    .catch(err => console.log('Error while getting the books from DB:', err));
});

router.get('/books/add', (req, res, next) => {
  res.render('book-add');
});

router.post('/books/add', (req, res, next) => {
  const data = { title, author, description, rating } = req.body;
  Book.create(data)
    .then(book => {
      res.redirect('/books');
    })
    .catch(err => console.log(err));
});

router.get('/books/:bookId', (req, res, next) => {
  let bookId = req.params.bookId;

  Book.findById(bookId)
    .then(book => {
      res.render('book-details', {book});
    })
    .catch(err => console.log('Error while retrieving book details: ', err));
});

module.exports = router;
