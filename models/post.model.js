const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  featuredImage: String,
  title: String,
  excerpt: String,
  content: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);