const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Initialize passport serialization (required even if not configured)
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Only configure GitHub OAuth if credentials exist
const hasGitHubConfig = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;

if (hasGitHubConfig) {
  try {
    passport.use('github',
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: process.env.GITHUB_CALLBACK_URL || `http://localhost:5000/api/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const startTime = Date.now();
            console.log('🔍 Processing GitHub OAuth for:', profile.username);
            
            const email = profile.emails?.[0]?.value || `${profile.username}@github.oauth`;
            
            // Combine queries - find by githubId OR email
            let user = await User.findOne({
              $or: [
                { githubId: profile.id },
                { email: email }
              ]
            });
            
            if (!user) {
              // Create new user
              user = await User.create({
                name: profile.displayName || profile.username,
                email: email,
                password: 'oauth-' + Math.random().toString(36).slice(-16),
                avatar: profile.photos?.[0]?.value || '',
                githubId: profile.id,
              });
              console.log('✨ Created new user from GitHub:', email, `(${Date.now() - startTime}ms)`);
            } else {
              // Link GitHub account if not linked
              if (!user.githubId) {
                user.githubId = profile.id;
              }
              // Update avatar
              if (profile.photos?.[0]?.value && user.avatar !== profile.photos[0].value) {
                user.avatar = profile.photos[0].value;
              }
              if (user.isModified()) {
                await user.save();
              }
              console.log('✅ GitHub user authenticated:', email, `(${Date.now() - startTime}ms)`);
            }

            return done(null, user);
          } catch (error) {
            console.error('GitHub OAuth error:', error);
            return done(error, null);
          }
        }
      )
    );
    
    console.log('✅ GitHub OAuth strategy configured');
  } catch (error) {
    console.error('❌ Failed to configure GitHub OAuth:', error.message);
  }
} else {
  console.log('⚠️  GitHub OAuth NOT configured (GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET missing)');
}

module.exports = { passport, hasGitHubConfig };