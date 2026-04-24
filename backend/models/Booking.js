const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true,
    enum: ['law', 'realestate', 'foundation', 'credit']
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
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
  preferred_date: {
    type: Date,
    default: null
  },
  preferred_time: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
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
bookingSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
