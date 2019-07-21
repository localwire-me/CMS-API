const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  picture: String,
  created: { type: Date, default: Date.now },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Author', AuthorSchema);