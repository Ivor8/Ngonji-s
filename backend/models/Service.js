const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  icon: {
    type: String,
    default: ''
  },
  is_active: {
    type: Boolean,
    default: true
  },
  sort_order: {
    type: Number,
    default: 0
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
serviceSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
