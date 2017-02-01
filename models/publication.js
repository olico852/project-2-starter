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
  picture: {
    data: Buffer,
    contentType: String
  },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' }
})

// publicationSchema.pre('save', function(next) {
//   //DO NOT USE FAT ARROW AS IT IS UNBINDABLE WHICH MAKES 'THIS' UNDEFINED
//   console.log(req.body.name);
//   if (req.body.name.length < 5){
//     //do some code...
//     pad with sstring
//
//   }
// });

const Publication = mongoose.model('Publication', publicationSchema)

module.exports = Publication
