const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  description:
  { type: String,
    required: true,
  },
  url: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Publication = mongoose.model('Publication', publicationSchema)

module.exports = Publication
