const express = require('express');
const router = express.Router();
const { analyzeRepo, explainCode, getHistory, getRepo } = require('../controllers/repoController');
const { protect } = require('../middleware/auth');

router.post('/analyze', protect, analyzeRepo);
router.post('/explain-code', protect, explainCode);
router.get('/history', protect, getHistory);
router.get('/:repoId', protect, getRepo);

module.exports = router;
