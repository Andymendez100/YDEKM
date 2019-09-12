const mongoose = require('mongoose');

// User Schema
const PostSchema = mongoose.Schema({
  title: {
    type: String,
  },
  ownerId: {
    type: String,
  },
  body: {
    type: String,
  },
});

export const Post = mongoose.model('Post', PostSchema);
