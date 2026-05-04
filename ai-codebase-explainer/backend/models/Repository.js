const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
  },
  repoName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  stars: {
    type: Number,
    default: 0,
  },
  language: {
    type: String,
    default: '',
  },
  analyzedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Repository', repositorySchema);
