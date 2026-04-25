const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import routes
const serviceRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contacts');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(limiter);
app.use(morgan('dev')); // Use dev format for cleaner logs
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
// Handle JSON and form data, but completely skip for FormData
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  
  console.log(`\n🔍 MIDDLEWARE DEBUG: ${req.method} ${req.originalUrl}`);
  console.log('Content-Type:', contentType);
  console.log('Content-Length:', req.headers['content-length']);
  
  if (contentType.includes('multipart/form-data')) {
    console.log('✅ Detected FormData - SKIPPING JSON parser');
    // Skip ALL body parsing for FormData - let multer handle it
    return next();
  }
  
  console.log('📝 Regular request - applying JSON parser');
  // Only parse JSON and form data for non-FormData requests
  express.json({ limit: '10mb' })(req, res, (err) => {
    if (err) {
      console.error('❌ JSON parser error:', err);
      return next(err);
    }
    console.log('✅ JSON parser successful');
    express.urlencoded({ extended: true, limit: '10mb' })(req, res, next);
  });
});

// Upload route BEFORE middleware to avoid JSON parsing conflicts
app.use('/api/upload', uploadRoutes);

// Serve uploaded files with CORS
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});
