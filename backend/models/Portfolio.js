const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true,
    enum: ['law', 'realestate', 'foundation', 'credit']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: ''
  },
  client_name: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field on save
portfolioSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
