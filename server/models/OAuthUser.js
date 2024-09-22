const mongoose = require('mongoose');

const oauthUserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false  // Email may not be provided by OAuth
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model('OAuthUser', oauthUserSchema);
