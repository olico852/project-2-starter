require('dotenv').config({ silent: true })
const mongoose = require('mongoose')
const express = require('express')
const ejsLayouts = require("express-ejs-layouts")
const publication = require('./routers/publication_router')
// const post = require('./routers/post_router')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const morgan = require('morgan')
const router = express.Router() // get an instance of the express Router
const app = express()

mongoose.connect('mongodb://localhost/social-journalism')

app.set('view engine', 'ejs');

//express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//passport init
app.use(passport.initialize())
//get passport to utilise session
app.use(passport.session())

app.use(flash());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.json());

app.use(require('morgan')('dev'))

//custom middleware
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  //everything inside locals made available in views
  res.locals.alerts = req.flash();
  //store in cookie and set it to req.user
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'views')))

//signup & login page
app.get('/', function(req, res) {
  res.render('index');
});

app.use('/auth', require('./controllers/auth'))

//after isLoggedIn everything needs to be logged in
app.use(isLoggedIn)

app.use('/homepage', publication)


const server = app.listen(process.env.PORT || 3000)  // set our port
console.log('SERVER UPUPUP!');
