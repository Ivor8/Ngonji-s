const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public (in production, add authentication)
exports.getContacts = async (req, res) => {
  try {
    const { entity, is_read } = req.query;
    
    let query = {};
    if (entity) query.entity = entity;
    if (is_read !== undefined) query.is_read = is_read === 'true';

    const contacts = await Contact.find(query)
      .sort({ created_at: -1 });

    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Public (in production, add authentication)
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Public (in production, add authentication)
exports.updateContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public (in production, add authentication)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

// @desc    Toggle read status
// @route   PATCH /api/contacts/:id/toggle-read
// @access  Public (in production, add authentication)
exports.toggleReadStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.is_read = !contact.is_read;
    await contact.save();

    res.json(contact);
  } catch (error) {
    console.error('Error toggling read status:', error);
    res.status(500).json({ error: 'Failed to toggle read status' });
  }
};
