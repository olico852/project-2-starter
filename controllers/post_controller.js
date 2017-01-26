let Post = require('../models/post')
let User = require('../models/user')

let postController = {
  list: (req, res) => {
    var populateQuery = [{}]
    Post.find({publication_id: req.params.id})
    .populate('publication_id')
    .populate('user_id')
    .exec(
     (err, posts) => {
       console.log(posts);
       console.log('yoyoyo');
       console.log('Posts : '+ JSON.stringify(posts));
       console.log('Posts : '+ posts[0].content);
       console.log('Posts : '+ posts[0].publication_id);
      // console.log('Posts : '+ req.user.id);
      //  if (!posts[0].publication_id.user_id.equals(req.user.id)) {
      //    return
      //  }
       if (err) throw err
       console.log('postshwllo' + posts);
       res.render('partials/newpost', { posts: posts })
     })
  },

  // new: (req, res) => {
  //   res.render('partials/newpost')
  // },

  listOne: (req, res) => {
    console.log('SINGLEPOST')
    Post.findById(req.params.id, (err, eachPost) => {
      console.log('eachPost: ' + eachPost)
      if (err) throw err
      res.render('partials/newpost', { eachPost: eachPost })
    })
  },

  create: (req, res) => {
    let newPost = new Post({
      content: req.body.content,
      publishedAt: req.body.publishedAt,
      user_id: req.user.id,
      publication_id: req.params.id
    })
    newPost.save(function (err, post) {
      if (err) throw err
      console.log('save');
      res.redirect('/homepage/'+req.params.id)
    })
  }
}

module.exports = postController
