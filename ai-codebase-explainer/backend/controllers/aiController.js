const { chatWithAI } = require('../utils/backend-utils-groq');
const Analysis = require('../models/Analysis');
const Repository = require('../models/Repository');

// POST /api/ai/chat
const chat = async (req, res) => {
  const { messages, repoId } = req.body;

  try {
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    let repoContext = { repoName: 'Unknown', summary: '', technologies: [] };

    if (repoId) {
      const repository = await Repository.findById(repoId);
      const analysis = await Analysis.findOne({ repoId });
      if (repository && analysis) {
        repoContext = {
          repoName: repository.repoName,
          summary: analysis.summary,
          technologies: analysis.technologies,
        };
      }
    }

    const reply = await chatWithAI(messages, repoContext);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { chat };
