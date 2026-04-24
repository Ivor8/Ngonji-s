const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  toggleReadStatus
} = require('../controllers/contactController');

// Validation rules
const contactValidation = [
  body('entity')
    .isIn(['law', 'realestate', 'foundation', 'credit', 'general'])
    .withMessage('Invalid entity type'),
  body('full_name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Full name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be less than 20 characters'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must be less than 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Message is required'),
  body('is_read')
    .optional()
    .isBoolean()
    .withMessage('is_read must be a boolean')
];

// Routes
router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', contactValidation, createContact);
router.put('/:id', contactValidation, updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/toggle-read', toggleReadStatus);

module.exports = router;
