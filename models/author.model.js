const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const AuthorSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  picture: String,
  created: { type: Date, default: Date.now },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

AuthorSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar' + md5 + '?s' + size + '&d=retro';
  }
}

module.exports = mongoose.model('Author', AuthorSchema);