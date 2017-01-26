const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
  content: { type: String },
  publishedAt: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  publication_id: { type: Schema.Types.ObjectId, ref: 'Publication' }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
