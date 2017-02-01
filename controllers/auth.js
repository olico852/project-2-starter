var express = require('express');
var User = require('../models/user');
var passport = require('../config/ppConfig');
var flash = require('connect-flash');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  }, function(err, createdUser) {
    if(err){
      // FLASH -
      req.flash('error', 'Could not create user account');
      res.redirect('/auth/signup');
    } else {
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/homepage/',
        successFlash: 'Account created and logged in'
      })(req, res);
    }
  });
});

// FLASH
//.authenticate (middleware)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/homepage/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  //delete session
  req.logout();
  // FLASH
  req.flash('success', 'You have logged out');
  res.redirect('/');
})

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

// FLASH
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  // FLASH
  req.flash('success', 'You have logged out');
  res.redirect('/');
});


module.exports = router;
