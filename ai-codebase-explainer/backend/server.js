const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables FIRST
dotenv.config();

// Initialize passport AFTER env is loaded
const { passport } = require('./config/passport');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware - ORDER MATTERS!
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/oauth')); // GitHub OAuth routes
app.use('/api/user', require('./routes/user'));
app.use('/api/repo', require('./routes/repo'));
app.use('/api/ai', require('./routes/ai'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'AI Codebase Explainer API is running 🚀',
    githubOAuth: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`🌐 Client: ${process.env.CLIENT_URL || 'http://localhost:5173'}\n`);
});