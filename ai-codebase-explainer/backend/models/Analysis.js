const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  repoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  detailedExplanation: {
    type: String,
    default: '',
  },
  technologies: {
    type: [String],
    default: [],
  },
  dependencies: {
    type: [String],
    default: [],
  },
  setupSteps: {
    type: [String],
    default: [],
  },
  fileStructure: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analysis', analysisSchema);
