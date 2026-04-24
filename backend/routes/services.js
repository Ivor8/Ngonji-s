const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// Validation rules
const serviceValidation = [
  body('entity')
    .isIn(['law', 'realestate', 'foundation', 'credit'])
    .withMessage('Invalid entity type'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Icon must be less than 100 characters'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean'),
  body('sort_order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('sort_order must be a non-negative integer')
];

// Routes
router.get('/', getServices);
router.get('/:id', getService);
router.post('/', serviceValidation, createService);
router.put('/:id', serviceValidation, updateService);
router.delete('/:id', deleteService);

module.exports = router;
