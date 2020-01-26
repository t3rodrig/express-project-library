const express = require('express');
const bcrypt = require('bcrypt');

// User model
const User = require('../models/user');

// BCrypt to encrypt passwords
const saltRounds = 10;

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPass = bcrypt.hashSync(password, salt);

  if(!username || !password){
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({username})
  .then(user => {
    if (user !== null){
      res.render('auth/signup', {
        errorMessage: "The username already exist"
      });
      return;
    }

    User.create({
      username,
      password: hashPass
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));

  })
  .catch(err => next(err));


});

module.exports = router;