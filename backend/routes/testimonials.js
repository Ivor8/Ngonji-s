const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');

// Validation rules
const testimonialValidation = [
  body('entity')
    .isIn(['law', 'realestate', 'foundation', 'credit'])
    .withMessage('Invalid entity type'),
  body('client_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Client name must be between 1 and 100 characters'),
  body('client_title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Client title must be less than 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean')
];

// Routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', testimonialValidation, createTestimonial);
router.put('/:id', testimonialValidation, updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
