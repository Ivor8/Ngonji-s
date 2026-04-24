const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true,
    enum: ['law', 'realestate', 'foundation', 'credit']
  },
  client_name: {
    type: String,
    required: true,
    trim: true
  },
  client_title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  is_active: {
    type: Boolean,
    default: true
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
testimonialSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
