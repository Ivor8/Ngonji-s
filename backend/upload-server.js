const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Upload server connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const Portfolio = require('./models/Portfolio');

const app = express();
const PORT = process.env.UPLOAD_PORT || 5001;

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'portfolio-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Portfolio upload route
app.post('/portfolio', upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Create portfolio item
    const portfolioData = {
      entity: req.body.entity,
      title: req.body.title,
      description: req.body.description,
      client_name: req.body.client_name || '',
      category: req.body.category || '',
      image_url: `/uploads/${req.file.filename}`,
      is_featured: req.body.is_featured === 'true' || req.body.is_featured === true
    };

    const portfolioItem = new Portfolio(portfolioData);
    await portfolioItem.save();

    console.log('Portfolio item created successfully:', portfolioItem);
    res.status(201).json(portfolioItem);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload portfolio item', details: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Upload server OK', port: PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 Upload server running on port ${PORT}`);
});
