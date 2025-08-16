const express = require('express');
const jwt = require('jsonwebtoken');
const Business = require('../models/Business');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get all applications for a business
router.get('/', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    res.json({ applications: business.requiredLicenses });
  } catch (error) {
    console.error('Applications fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update application status
router.patch('/:applicationId/status', authenticateToken, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, comments } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const application = business.requiredLicenses.id(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    if (status === 'applied') {
      application.applicationDate = new Date();
    } else if (status === 'approved') {
      application.approvalDate = new Date();
    }

    await business.save();

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Application status update error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

module.exports = router; 