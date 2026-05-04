// const Repository = require('../models/Repository');
// const Analysis = require('../models/Analysis');
// const { parseGitHubUrl, fetchFileTree, fetchFileContent, fetchRepoMetadata, fetchKeyFilesContent } = require('../utils/github');
// const { analyzeRepository } = require('../utils/backend-utils-groq');

// // POST /api/repo/analyze
// const analyzeRepo = async (req, res) => {
//   const { repoUrl } = req.body;

//   try {
//     if (!repoUrl) return res.status(400).json({ message: 'Repository URL is required' });

//     const { owner, repo } = parseGitHubUrl(repoUrl);

//     // Check if already analyzed
//     let repository = await Repository.findOne({ repoUrl, userId: req.user._id });
//     if (repository) {
//       const existingAnalysis = await Analysis.findOne({ repoId: repository._id });
//       if (existingAnalysis) {
//         return res.json({
//           repository,
//           analysis: existingAnalysis,
//           fileStructure: existingAnalysis.fileStructure,
//           cached: true,
//         });
//       }
//     }

//     // Fetch GitHub data
//     const metadata = await fetchRepoMetadata(owner, repo);
//     const fileTree = await fetchFileTree(owner, repo);
//     const keyFilesContent = await fetchKeyFilesContent(owner, repo, fileTree);

//     // Save repository
//     if (!repository) {
//       repository = await Repository.create({
//         userId: req.user._id,
//         repoUrl,
//         repoName: metadata.name,
//         owner,
//         description: metadata.description || '',
//         stars: metadata.stargazers_count || 0,
//         language: metadata.language || '',
//       });
//     }

//     // AI analysis
//     const aiResult = await analyzeRepository(metadata.name, fileTree, keyFilesContent, metadata);

//     // Save analysis
//     const analysis = await Analysis.create({
//       repoId: repository._id,
//       userId: req.user._id,
//       summary: aiResult.summary,
//       detailedExplanation: aiResult.detailedExplanation,
//       technologies: aiResult.technologies,
//       dependencies: aiResult.dependencies,
//       setupSteps: aiResult.setupSteps,
//       fileStructure: fileTree,
//     });

//     res.json({ repository, analysis, fileStructure: fileTree, cached: false });
//   } catch (error) {
//     console.error('analyzeRepo error:', error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// // POST /api/repo/explain-code
// const explainCode = async (req, res) => {
//   const { owner, repo, filePath } = req.body;

//   try {
//     const { explainCode: explainCodeAI } = require('../utils/gemini');
//     const code = await fetchFileContent(owner, repo, filePath);

//     if (!code) return res.status(404).json({ message: 'File not found or too large' });

//     const explanation = await explainCodeAI(filePath, code, `${owner}/${repo}`);
//     res.json({ explanation, code });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET /api/repo/history
// const getHistory = async (req, res) => {
//   try {
//     const repositories = await Repository.find({ userId: req.user._id }).sort({ analyzedAt: -1 });

//     const history = await Promise.all(
//       repositories.map(async (r) => {
//         const analysis = await Analysis.findOne({ repoId: r._id });
//         return { repository: r, analysis };
//       })
//     );

//     res.json(history);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET /api/repo/:repoId
// const getRepo = async (req, res) => {
//   try {
//     const repository = await Repository.findOne({ _id: req.params.repoId, userId: req.user._id });
//     if (!repository) return res.status(404).json({ message: 'Repository not found' });

//     const analysis = await Analysis.findOne({ repoId: repository._id });
//     res.json({ repository, analysis, fileStructure: analysis?.fileStructure || [] });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { analyzeRepo, explainCode, getHistory, getRepo };
const Repository = require('../models/Repository');
const Analysis = require('../models/Analysis');
const { parseGitHubUrl, fetchFileTree, fetchFileContent, fetchRepoMetadata, fetchKeyFilesContent } = require('../utils/github');
const { analyzeRepository } = require('../utils/backend-utils-groq');

// POST /api/repo/analyze
const analyzeRepo = async (req, res) => {
  const { repoUrl } = req.body;

  try {
    if (!repoUrl) return res.status(400).json({ message: 'Repository URL is required' });

    const { owner, repo } = parseGitHubUrl(repoUrl);
    console.log(`\n📦 Analyzing: ${owner}/${repo}`);

    // Check if already analyzed
    let repository = await Repository.findOne({ repoUrl, userId: req.user._id });
    if (repository) {
      const existingAnalysis = await Analysis.findOne({ repoId: repository._id });
      if (existingAnalysis) {
        console.log(`✓ Using cached analysis`);
        return res.json({
          repository,
          analysis: existingAnalysis,
          fileStructure: existingAnalysis.fileStructure,
          cached: true,
        });
      }
    }

    // Fetch GitHub data
    console.log('🔍 Fetching metadata...');
    const metadata = await fetchRepoMetadata(owner, repo);
    
    console.log('📂 Fetching file tree...');
    const fileTree = await fetchFileTree(owner, repo);
    
    console.log('📄 Fetching key files...');
    const keyFilesContent = await fetchKeyFilesContent(owner, repo, fileTree);

    // Save repository
    if (!repository) {
      repository = await Repository.create({
        userId: req.user._id,
        repoUrl,
        repoName: metadata.name,
        owner,
        description: metadata.description || '',
        stars: metadata.stargazers_count || 0,
        language: metadata.language || '',
      });
      console.log('✓ Repository saved to DB');
    }

    // AI analysis
    console.log('🤖 Running AI analysis...');
    const aiResult = await analyzeRepository(metadata.name, fileTree, keyFilesContent, metadata);

    // Save analysis
    const analysis = await Analysis.create({
      repoId: repository._id,
      userId: req.user._id,
      summary: aiResult.summary,
      detailedExplanation: aiResult.detailedExplanation,
      technologies: aiResult.technologies,
      dependencies: aiResult.dependencies,
      setupSteps: aiResult.setupSteps,
      fileStructure: fileTree,
    });

    console.log('✅ Analysis complete!\n');
    res.json({ repository, analysis, fileStructure: fileTree, cached: false });
  } catch (error) {
    console.error('❌ analyzeRepo error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/repo/explain-code - FIXED VERSION
const explainCode = async (req, res) => {
  const { owner, repo, filePath } = req.body;

  try {
    console.log(`\n📄 Fetching code: ${owner}/${repo}/${filePath}`);
    
    const { explainCode: explainCodeAI } = require('../utils/backend-utils-groq');
    const code = await fetchFileContent(owner, repo, filePath);

    if (!code) {
      console.error('✗ File content is empty or failed to fetch');
      return res.status(404).json({ 
        message: 'File not found or could not be loaded',
        code: '// File could not be loaded. Try a different file or check if it exists in the repository.'
      });
    }

    // Check file size
    if (code.length > 500000) { // 500KB limit
      console.log('⚠ File too large for AI explanation');
      return res.json({ 
        code: code.substring(0, 100000), // Send first 100KB of code
        explanation: '**Note:** This file is very large (>500KB). Only the first portion is shown. The file is too large for AI analysis. Consider analyzing smaller, more focused files.'
      });
    }

    console.log(`✓ Code fetched (${code.length} chars). Generating explanation...`);
    const explanation = await explainCodeAI(filePath, code, `${owner}/${repo}`);
    
    console.log('✅ Explanation generated\n');
    res.json({ explanation, code });
  } catch (error) {
    console.error('❌ explainCode error:', error.message);
    res.status(500).json({ 
      message: error.message,
      code: '// Error loading file content',
      explanation: 'Failed to generate explanation. Please try again.'
    });
  }
};

// GET /api/repo/history
const getHistory = async (req, res) => {
  try {
    const repositories = await Repository.find({ userId: req.user._id }).sort({ analyzedAt: -1 });

    const history = await Promise.all(
      repositories.map(async (r) => {
        const analysis = await Analysis.findOne({ repoId: r._id });
        return { repository: r, analysis };
      })
    );

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/repo/:repoId
const getRepo = async (req, res) => {
  try {
    const repository = await Repository.findOne({ _id: req.params.repoId, userId: req.user._id });
    if (!repository) return res.status(404).json({ message: 'Repository not found' });

    const analysis = await Analysis.findOne({ repoId: repository._id });
    res.json({ repository, analysis, fileStructure: analysis?.fileStructure || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeRepo, explainCode, getHistory, getRepo };
