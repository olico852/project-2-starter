let Publication = require('../models/publication')
let User = require('../models/user')

let publicationController = {
  list: (req, res) => {
    Publication.find({user_id: req.user._id}, (err, journals) => {
      if (err) console.log(err);
      res.render('publication/index', { journals: journals })
    })
  },

  listAll: (req, res) => {
    Publication.find({user_id: {$ne: req.user.id}}).populate("user_id").exec((err, journals) => {
    if (err) console.log(err);
    res.render('publication/others', { journals: journals })
    })
  },

  new: (req, res) => {
    res.render('publication/newjournal')
  },

  listOne: (req, res) => {
    console.log('SINGLEJOURNAL');
    Publication.findById(req.params.id).populate("user_id").exec((err, eachJournal) => {
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

  create: (req, res) => {
    let newJournal = new Publication({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      user_id: req.user._id
    })
    newJournal.save(function (err, journal) {
      if (err) console.log(err);
      res.redirect('/homepage')
    })
  },

  edit: (req, res) => {
    Publication.findById(req.params.id, (err, eachJournal) => {
      if (err) console.log(err);
      res.render('publication/edit', { eachJournal: eachJournal })
    })
  },

  update: (req, res) => {
    console.log('entered');
    console.log(req.params.id);
    console.log(req.body);
    Publication.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      user_id: req.user.id
    },
     (err, eachJournal) => {
      if (err) console.log(err);
      console.log('err:' + err);
      console.log('eachJournal:' + eachJournal);
      res.redirect('/homepage/' + eachJournal._id)
    })
  },

  delete: (req, res) => {
    Publication.findByIdAndRemove(req.params.id, (err, eachJournal) => {
      if (err) console.log(err);
      res.redirect('/homepage')
    })
  }
}

module.exports = publicationController
