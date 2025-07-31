const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TeleHEDR API is running',
    version: '1.0.0',
    endpoints: {
      'POST /register': 'Create a new user',
      'POST /login': 'Authenticate user and get JWT',
      'GET /profile': 'Get user profile (requires JWT)'
    }
  });
});

// API routes
app.use('/', authRoutes);
app.use('/', profileRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TeleHEDR API server running on port ${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST http://localhost:${PORT}/register - Register new user`);
  console.log(`   POST http://localhost:${PORT}/login - Login user`);
  console.log(`   GET  http://localhost:${PORT}/profile - Get user profile (requires JWT)`);
  console.log(`\n🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 