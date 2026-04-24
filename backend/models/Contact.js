const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true,
    enum: ['law', 'realestate', 'foundation', 'credit', 'general']
  },
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  is_read: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
