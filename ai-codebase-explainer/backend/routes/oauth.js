const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport, hasGitHubConfig } = require('../config/passport');

if (hasGitHubConfig) {
  // GET /api/auth/github - Initiate GitHub OAuth
  router.get('/github', 
    (req, res, next) => {
      console.log('🔐 Initiating GitHub OAuth flow...');
      console.log('GitHub Config:', {
        clientID: process.env.GITHUB_CLIENT_ID ? '✓ Set' : '✗ Missing',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ? '✓ Set' : '✗ Missing',
        callbackURL: process.env.GITHUB_CALLBACK_URL || `${process.env.CLIENT_URL}/auth/github/callback`
      });
      next();
    },
    passport.authenticate('github', { 
      scope: ['user:email'],
      session: false 
    })
  );

  // GET /api/auth/github/callback - GitHub OAuth callback
  router.get('/github/callback',
    (req, res, next) => {
      console.log('✅ GitHub OAuth callback received');
      next();
    },
    passport.authenticate('github', { 
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`
    }),
    (req, res) => {
      try {
        if (!req.user) {
          console.error('❌ No user object in request after GitHub auth');
          return res.redirect(`${process.env.CLIENT_URL}/login?error=no_user`);
        }

        console.log('🎉 GitHub OAuth successful, generating JWT for user:', req.user.email);
        
        // Generate JWT
        const token = jwt.sign(
          { id: req.user._id }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
        );

        const userData = {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          avatar: req.user.avatar || '',
        };

        console.log('🔄 Redirecting to frontend with token...');

        // Redirect to frontend with token
        const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
        console.log('📍 Redirect URL:', redirectUrl.split('?')[0] + '?token=***&user=***');
        res.redirect(redirectUrl);
      } catch (error) {
        console.error('❌ Error in GitHub callback:', error.message);
        res.redirect(`${process.env.CLIENT_URL}/login?error=token_generation_failed`);
      }
    }
  );

  console.log('✅ GitHub OAuth routes enabled at /api/auth/github');
} else {
  // Provide helpful error message if OAuth not configured
  router.get('/github', (req, res) => {
    res.status(503).json({ 
      message: 'GitHub OAuth is not configured. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to environment variables.' 
    });
  });
  
  console.log('⚠️  GitHub OAuth routes disabled (not configured)');
}

module.exports = router;