const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  isArchived: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);