const express = require('express');
const router  = express.Router();

const Book = require('../models/book');
const Author = require('../models/author');

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

router.get('/books/edit', (req, res, next) => {
  let bookId = req.query.bookId;

  Book.findById(bookId)
    .then(book => {
      res.render('book-edit', {book});
    })
    .catch(err => console.log('Error while retrieving book: ', err));
});

router.post('/books/edit', (req, res, next) => {
  let bookId = req.query.bookId;
  const data = { title, author, description, rating } = req.body;

  Book.findByIdAndUpdate(bookId, {$set: data}, { new: true })
    .then(book => {
      res.redirect('/books');
    })
    .catch(err => console.log('Error while retrieving book: ', err));
  
});

router.get('/books/:bookId', (req, res, next) => {
  let bookId = req.params.bookId;
  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
    return res.status(404).render('not-found');
  }
  Book.findById(bookId)
    .populate('author')
    .then(book => {
      if (!book) {
        return res.status(404).render('not-found');
      }
      res.render('book-details', {book});
      console.log(book);
    })
    .catch(err => console.log('Error while retrieving book details: ', err));
});

router.get('/authors/add', (req, res, next) => {
  res.render('author-add');
});

router.post('/authors/add', (req, res, next) => {
  const data = { name, lastName, nationality, birthday, pictureUrl } = req.body;
  Author.create(data)
  .then(author => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = router;
