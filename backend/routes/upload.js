const express = require('express');
const multer = require('multer');
const path = require('path');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Configure multer for file uploads
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

// Simple portfolio upload route
router.post('/portfolio', upload.single('image'), async (req, res) => {
  console.log('\n=== PORTFOLIO UPLOAD DEBUG START ===');
  console.log('Request headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  
  try {
    // Debug multer processing
    console.log('After multer middleware');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Files array:', req.files);
    
    // Check if file was uploaded
    if (!req.file) {
      console.log('❌ ERROR: No file uploaded');
      console.log('Available fields:', Object.keys(req.body));
      return res.status(400).json({ 
        error: 'No image file uploaded',
        debug: {
          body: req.body,
          file: req.file,
          headers: req.headers
        }
      });
    }

    console.log('✅ File uploaded successfully:', req.file.filename);
    console.log('File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    // Debug form data parsing
    console.log('Form data fields:');
    Object.keys(req.body).forEach(key => {
      console.log(`  ${key}:`, req.body[key]);
    });

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

    console.log('Portfolio data to save:', portfolioData);

    const portfolioItem = new Portfolio(portfolioData);
    
    // Debug MongoDB save
    console.log('Attempting to save to MongoDB...');
    await portfolioItem.save();
    console.log('✅ Portfolio item saved successfully:', portfolioItem._id);

    console.log('=== PORTFOLIO UPLOAD DEBUG END ===\n');
    res.status(201).json(portfolioItem);

  } catch (error) {
    console.error('❌ UPLOAD ERROR:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    console.log('=== PORTFOLIO UPLOAD DEBUG END ===\n');
    res.status(500).json({ 
      error: 'Failed to upload portfolio item', 
      details: error.message,
      stack: error.stack,
      debug: {
        body: req.body,
        file: req.file,
        headers: req.headers
      }
    });
  }
});

// Test route to verify upload endpoint is working
router.get('/test', (req, res) => {
  res.json({ message: 'Upload endpoint is working!' });
});

module.exports = router;
