const Portfolio = require('../models/Portfolio');
const { validationResult } = require('express-validator');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolioItems = async (req, res) => {
  try {
    const { entity, is_featured } = req.query;
    
    let query = {};
    if (entity) query.entity = entity;
    if (is_featured !== undefined) query.is_featured = is_featured === 'true';

    const portfolioItems = await Portfolio.find(query)
      .sort({ created_at: -1 });

    res.json(portfolioItems);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    
    if (!portfolioItem) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    res.json(portfolioItem);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio item' });
  }
};

// @desc    Create new portfolio item
// @route   POST /api/portfolio
// @access  Public (in production, add authentication)
exports.createPortfolioItem = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // If image was uploaded, add the URL to the request body
    if (req.file) {
      req.body.image_url = `/uploads/${req.file.filename}`;
    }

    // Convert is_featured to boolean if it's a string
    if (req.body.is_featured !== undefined) {
      req.body.is_featured = req.body.is_featured === 'true' || req.body.is_featured === true;
    }

    const portfolioItem = new Portfolio(req.body);
    await portfolioItem.save();

    console.log('Portfolio item created:', portfolioItem);
    res.status(201).json(portfolioItem);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    res.status(500).json({ error: 'Failed to create portfolio item', details: error.message });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Public (in production, add authentication)
exports.updatePortfolioItem = async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Update uploaded file:', req.file);

    // If image was uploaded, add the URL to the request body
    if (req.file) {
      req.body.image_url = `/uploads/${req.file.filename}`;
    }

    // Convert is_featured to boolean if it's a string
    if (req.body.is_featured !== undefined) {
      req.body.is_featured = req.body.is_featured === 'true' || req.body.is_featured === true;
    }

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!portfolioItem) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    console.log('Portfolio item updated:', portfolioItem);
    res.json(portfolioItem);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ error: 'Failed to update portfolio item', details: error.message });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Public (in production, add authentication)
exports.deletePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
};
