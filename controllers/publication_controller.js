const Publication = require('../models/publication')
const User = require('../models/user')

const publicationController = {
  list: function (req, res) {
    Publication.find({user_id: req.user._id}, function (err, journals) {
      if (err) console.log(err);
      res.render('publication/index', { journals: journals })
    })
  },

  listAll: function (req, res) {
    Publication.find({user_id: {$ne: req.user.id}})
    .populate("user_id")
    .exec(
      function (err, journals) {
    if (err) console.log(err);
    res.render('publication/others', { journals: journals })
    })
  },

  new: function (req, res) {
    res.render('publication/newjournal')
  },

  listOne: function (req, res) {
    console.log('SINGLEJOURNAL');
    Publication.findById(req.params.id)
    .populate("user_id")
    .exec(
      function (err, eachJournal) {
      console.log(eachJournal);
      console.log('hello');
      if (err) console.log(err);
      res.render('publication/single-journal', { eachJournal: eachJournal })
    })
  },

  // listOne: (req, res) => {
  //   console.log('SINGLEJOURNAL');
  //   Publication.findById(req.params.id, (err, eachJournal) => {
  //     console.log(eachJournal);
  //     if (err) throw err
  //     res.render('publication/single-journal', { eachJournal: eachJournal })
  //   })
  // },

  create: function (req, res) {
    let newJournal = new Publication({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      picture: req.body.picture,
      user_id: req.user._id
    })
    newJournal.save(function (err, journal) {
      if (err) return res.status(404);
      res.redirect('/homepage')
    })
  },

  edit: function (req, res) {
    Publication.findById(req.params.id, function (err, eachJournal) {
      if (err) console.log(err);
      res.render('publication/edit', { eachJournal: eachJournal })
    })
  },

  update: function (req, res) {
    console.log('entered');
    console.log(req.params.id);
    console.log(req.body);
    Publication.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      picture: req.body.picture,
      user_id: req.user.id
    },
     function (err, eachJournal) {
      if (err) console.log(err);
      console.log('err:' + err);
      console.log('eachJournal:' + eachJournal);
      res.redirect('/homepage/' + eachJournal._id)
    })
  },

  delete: function (req, res) {
    Publication.findByIdAndRemove(req.params.id, function (err, eachJournal) {
      if (err) console.log(err);
      res.redirect('/homepage')
    })
  }
}

module.exports = publicationController
