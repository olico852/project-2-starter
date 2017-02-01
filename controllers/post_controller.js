let Post = require('../models/post')
let User = require('../models/user')

let postController = {
  list: function (req, res) {
    var populateQuery = [{}] // redundant code.
    Post.find({publication_id: req.params.id})
    .populate('publication_id')
    .populate('user_id')
    .exec(
     function (err, posts) {
       console.log(posts) // would help keep the codes more organised if console logs can be commented out. 
       console.log('yoyoyo');
       console.log('Posts : '+ JSON.stringify(posts));
       console.log('Posts : '+ posts[0].content);
       console.log('Posts : '+ posts[0].publication_id);
      // console.log('Posts : '+ req.user.id);
      //  if (!posts[0].publication_id.user_id.equals(req.user.id)) {
      //    return
      //  }
       if (err) console.log(err);
       console.log('postshwllo' + posts);
       res.render('partials/newpost', { posts: posts })
     })
  },

  // new: (req, res) => {
  //   res.render('partials/newpost')
  // },

  listOne: function (req, res) {
    console.log('SINGLEPOST')
    Post.findById(req.params.id, function (err, eachPost) {
      console.log('eachPost: ' + eachPost)
      if (err) console.log(err);
      res.render('partials/newpost', { eachPost: eachPost })
    })
  },

  create: function (req, res) {
    let newPost = new Post({
      content: req.body.content,
      publishedAt: req.body.publishedAt,
      user_id: req.user.id,
      publication_id: req.params.id
    })
    newPost.save(function (err, post) {
      if (err) console.log(err);
      console.log('save');
      res.redirect('/homepage/'+req.params.id)
    })
  }
}

module.exports = postController
