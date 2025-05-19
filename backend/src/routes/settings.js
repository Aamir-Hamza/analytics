const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get user settings
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('settings');
    res.json(user.settings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user settings
router.patch('/', auth, [
  body('notifications.email').optional().isBoolean(),
  body('notifications.push').optional().isBoolean(),
  body('theme').optional().isIn(['light', 'dark'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['notifications', 'theme'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    // Update settings
    if (req.body.notifications) {
      req.user.settings.notifications = {
        ...req.user.settings.notifications,
        ...req.body.notifications
      };
    }
    if (req.body.theme) {
      req.user.settings.theme = req.body.theme;
    }

    await req.user.save();
    res.json(req.user.settings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.patch('/profile', auth, [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('currentPassword').optional().isLength({ min: 6 }),
  body('newPassword').optional().isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, currentPassword, newPassword } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;

    // Handle password change
    if (currentPassword && newPassword) {
      const isMatch = await req.user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      updates.password = newPassword;
    }

    // Update user
    Object.keys(updates).forEach(update => {
      req.user[update] = updates[update];
    });

    await req.user.save();
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 