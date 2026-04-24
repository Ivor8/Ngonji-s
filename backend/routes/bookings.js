const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus
} = require('../controllers/bookingController');

// Validation rules
const bookingValidation = [
  body('entity')
    .isIn(['law', 'realestate', 'foundation', 'credit'])
    .withMessage('Invalid entity type'),
  body('full_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Full name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Phone is required and must be less than 20 characters'),
  body('service_id')
    .optional()
    .isMongoId()
    .withMessage('Invalid service ID'),
  body('preferred_date')
    .optional()
    .isISO8601()
    .withMessage('Preferred date must be a valid date'),
  body('preferred_time')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Preferred time must be less than 50 characters'),
  body('details')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Details must be less than 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Invalid status')
];

// Routes
router.get('/', getBookings);
router.get('/:id', getBooking);
router.post('/', bookingValidation, createBooking);
router.put('/:id', bookingValidation, updateBooking);
router.delete('/:id', deleteBooking);
router.patch('/:id/status', updateBookingStatus);

module.exports = router;
