const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getPortfolioItems,
  getPortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem
} = require('../controllers/portfolioController');

// Validation rules
const portfolioValidation = [
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
  body('client_name')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Client name must be less than 100 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must be less than 100 characters'),
  body('is_featured')
    .optional()
    .isBoolean()
    .withMessage('is_featured must be a boolean')
];

// Routes
router.get('/', getPortfolioItems);
router.get('/:id', getPortfolioItem);
router.post('/', upload.single('image'), createPortfolioItem);
router.put('/:id', upload.single('image'), updatePortfolioItem);
router.delete('/:id', deletePortfolioItem);

module.exports = router;
