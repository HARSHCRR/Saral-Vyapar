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

// Create or update business profile
router.post('/profile', authenticateToken, async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      industry,
      location,
      contactInfo,
      businessDetails,
      requiredLicenses
    } = req.body;

    let business = await Business.findOne({ userId: req.user.userId });

    if (business) {
      // Update existing business
      Object.assign(business, {
        businessName,
        businessType,
        industry,
        location,
        contactInfo,
        businessDetails,
        requiredLicenses: requiredLicenses || business.requiredLicenses,
        updatedAt: new Date()
      });
    } else {
      // Create new business
      business = new Business({
        userId: req.user.userId,
        businessName,
        businessType,
        industry,
        location,
        contactInfo,
        businessDetails,
        requiredLicenses: requiredLicenses || []
      });
    }

    await business.save();

    res.json({
      message: 'Business profile saved successfully',
      business: business.getSummary()
    });
  } catch (error) {
    console.error('Business profile error:', error);
    res.status(500).json({ error: 'Failed to save business profile' });
  }
});

// Get business profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    res.json({ business });
  } catch (error) {
    console.error('Business profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch business profile' });
  }
});

// Get business summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    res.json({ business: business.getSummary() });
  } catch (error) {
    console.error('Business summary error:', error);
    res.status(500).json({ error: 'Failed to fetch business summary' });
  }
});

// Update license status
router.patch('/licenses/:licenseId', authenticateToken, async (req, res) => {
  try {
    const { licenseId } = req.params;
    const { status, applicationDate, approvalDate, nftTokenId, nftTransactionHash } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const license = business.requiredLicenses.id(licenseId);
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    // Update license fields
    if (status) license.status = status;
    if (applicationDate) license.applicationDate = applicationDate;
    if (approvalDate) license.approvalDate = approvalDate;
    if (nftTokenId) license.nftTokenId = nftTokenId;
    if (nftTransactionHash) license.nftTransactionHash = nftTransactionHash;

    await business.save();

    res.json({
      message: 'License status updated successfully',
      license
    });
  } catch (error) {
    console.error('License update error:', error);
    res.status(500).json({ error: 'Failed to update license status' });
  }
});

// Get all licenses for a business
router.get('/licenses', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    res.json({ licenses: business.requiredLicenses });
  } catch (error) {
    console.error('Licenses fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch licenses' });
  }
});

// Add new license requirement
router.post('/licenses', authenticateToken, async (req, res) => {
  try {
    const { licenseType, department, description, estimatedTime, estimatedCost } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const newLicense = {
      licenseType,
      department,
      description,
      estimatedTime,
      estimatedCost,
      status: 'pending'
    };

    business.requiredLicenses.push(newLicense);
    await business.save();

    res.json({
      message: 'License requirement added successfully',
      license: newLicense
    });
  } catch (error) {
    console.error('License add error:', error);
    res.status(500).json({ error: 'Failed to add license requirement' });
  }
});

// Update business status
router.patch('/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    business.status = status;
    await business.save();

    res.json({
      message: 'Business status updated successfully',
      status: business.status
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update business status' });
  }
});

// Get business statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const totalLicenses = business.requiredLicenses.length;
    const pendingLicenses = business.requiredLicenses.filter(l => l.status === 'pending').length;
    const appliedLicenses = business.requiredLicenses.filter(l => l.status === 'applied').length;
    const approvedLicenses = business.requiredLicenses.filter(l => l.status === 'approved').length;
    const rejectedLicenses = business.requiredLicenses.filter(l => l.status === 'rejected').length;

    const totalCost = business.requiredLicenses.reduce((sum, license) => sum + (license.estimatedCost || 0), 0);

    res.json({
      statistics: {
        totalLicenses,
        pendingLicenses,
        appliedLicenses,
        approvedLicenses,
        rejectedLicenses,
        totalCost,
        completionPercentage: totalLicenses > 0 ? (approvedLicenses / totalLicenses) * 100 : 0
      }
    });
  } catch (error) {
    console.error('Statistics error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router; 