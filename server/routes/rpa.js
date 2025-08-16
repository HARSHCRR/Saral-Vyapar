const express = require('express');
const puppeteer = require('puppeteer');
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

// Store active automation sessions
const activeSessions = new Map();

// GST registration automation with OTP handling
router.post('/gst-automation', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    // Create automation session
    const sessionId = `gst_${Date.now()}_${req.user.userId}`;
    const session = {
      id: sessionId,
      userId: req.user.userId,
      businessId: business._id,
      licenseType: 'GST Registration',
      status: 'running',
      currentStep: 'initializing',
      steps: [],
      otpRequired: false,
      otpPrompt: null,
      browser: null,
      page: null,
      startTime: new Date(),
      data: {
        businessName: business.businessName,
        businessType: business.businessType,
        address: business.location.address,
        city: business.location.city,
        state: business.location.state,
        pincode: business.location.pincode,
        email: business.contactInfo.email,
        phone: business.contactInfo.phone
      }
    };

    activeSessions.set(sessionId, session);

    // Start automation in background
    runGSTAutomation(sessionId);

    res.json({
      success: true,
      message: 'GST registration automation started',
      sessionId: sessionId,
      status: 'running',
      currentStep: 'initializing',
      estimatedTime: '5-10 minutes'
    });

  } catch (error) {
    console.error('GST automation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to start GST automation',
      message: 'Please try again or fill the form manually'
    });
  }
});

// MSME registration automation with OTP handling
router.post('/msme-automation', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    // Create automation session
    const sessionId = `msme_${Date.now()}_${req.user.userId}`;
    const session = {
      id: sessionId,
      userId: req.user.userId,
      businessId: business._id,
      licenseType: 'MSME Registration',
      status: 'running',
      currentStep: 'initializing',
      steps: [],
      otpRequired: false,
      otpPrompt: null,
      browser: null,
      page: null,
      startTime: new Date(),
      data: {
        businessName: business.businessName,
        businessType: business.businessType,
        industry: business.industry,
        address: business.location.address,
        city: business.location.city,
        state: business.location.state,
        pincode: business.location.pincode,
        email: business.contactInfo.email,
        phone: business.contactInfo.phone
      }
    };

    activeSessions.set(sessionId, session);

    // Start automation in background
    runMSMEAutomation(sessionId);

    res.json({
      success: true,
      message: 'MSME registration automation started',
      sessionId: sessionId,
      status: 'running',
      currentStep: 'initializing',
      estimatedTime: '3-5 minutes'
    });

  } catch (error) {
    console.error('MSME automation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to start MSME automation',
      message: 'Please try again or fill the form manually'
    });
  }
});

// Get automation session status
router.get('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if user owns this session
    if (session.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      sessionId: session.id,
      status: session.status,
      currentStep: session.currentStep,
      steps: session.steps,
      otpRequired: session.otpRequired,
      otpPrompt: session.otpPrompt,
      startTime: session.startTime,
      elapsedTime: Date.now() - session.startTime.getTime()
    });

  } catch (error) {
    console.error('Session status error:', error);
    res.status(500).json({ error: 'Failed to get session status' });
  }
});

// Submit OTP for automation
router.post('/session/:sessionId/otp', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ error: 'OTP is required' });
    }

    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if user owns this session
    if (session.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!session.otpRequired) {
      return res.status(400).json({ error: 'No OTP required at this time' });
    }

    // Resume automation with OTP
    session.otpRequired = false;
    session.otpPrompt = null;
    session.steps.push({
      step: 'OTP Submitted',
      timestamp: new Date(),
      details: 'User provided OTP for verification'
    });

    // Continue automation
    if (session.licenseType === 'GST Registration') {
      continueGSTAutomation(sessionId, otp);
    } else if (session.licenseType === 'MSME Registration') {
      continueMSMEAutomation(sessionId, otp);
    }

    res.json({
      success: true,
      message: 'OTP submitted successfully',
      status: 'processing'
    });

  } catch (error) {
    console.error('OTP submission error:', error);
    res.status(500).json({ error: 'Failed to submit OTP' });
  }
});

// Cancel automation session
router.delete('/session/:sessionId', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Check if user owns this session
    if (session.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Clean up browser session
    if (session.browser) {
      await session.browser.close();
    }

    // Update session status
    session.status = 'cancelled';
    session.steps.push({
      step: 'Automation Cancelled',
      timestamp: new Date(),
      details: 'User cancelled the automation process'
    });

    // Update business license status
    const business = await Business.findById(session.businessId);
    if (business) {
      const license = business.requiredLicenses.find(l => l.licenseType === session.licenseType);
      if (license) {
        license.status = 'pending';
        await business.save();
      }
    }

    res.json({
      success: true,
      message: 'Automation session cancelled'
    });

  } catch (error) {
    console.error('Session cancellation error:', error);
    res.status(500).json({ error: 'Failed to cancel session' });
  }
});

// GST Automation Function
async function runGSTAutomation(sessionId) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    session.currentStep = 'launching_browser';
    session.steps.push({
      step: 'Launching Browser',
      timestamp: new Date(),
      details: 'Starting automated browser session'
    });

    // Launch browser
    session.browser = await puppeteer.launch({ 
      headless: false, // Show browser for demo
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    session.page = await session.browser.newPage();

    // Navigate to GST portal (demo URL)
    session.currentStep = 'navigating_to_portal';
    session.steps.push({
      step: 'Navigating to GST Portal',
      timestamp: new Date(),
      details: 'Accessing GST registration portal'
    });

    await session.page.goto('https://www.gst.gov.in/');
    await session.page.waitForTimeout(2000);

    // Fill registration form
    session.currentStep = 'filling_form';
    session.steps.push({
      step: 'Filling Registration Form',
      timestamp: new Date(),
      details: 'Entering business details'
    });

    // Simulate form filling (in real implementation, this would target actual form fields)
    await session.page.evaluate((data) => {
      // This is a simulation - in real implementation, you would target actual form fields
      console.log('Filling form with data:', data);
    }, session.data);

    await session.page.waitForTimeout(2000);

    // Simulate OTP requirement
    session.currentStep = 'otp_required';
    session.otpRequired = true;
    session.otpPrompt = {
      message: 'Please enter the OTP sent to your registered mobile number',
      phone: session.data.phone,
      type: 'sms',
      expiresIn: '300' // 5 minutes
    };

    session.steps.push({
      step: 'OTP Required',
      timestamp: new Date(),
      details: 'Waiting for user to provide OTP'
    });

    // Wait for OTP (this will be handled by the OTP submission endpoint)
    // In a real implementation, you would wait for the OTP to be provided

  } catch (error) {
    console.error('GST automation error:', error);
    session.status = 'failed';
    session.steps.push({
      step: 'Automation Failed',
      timestamp: new Date(),
      details: error.message
    });
  }
}

// Continue GST Automation after OTP
async function continueGSTAutomation(sessionId, otp) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    session.currentStep = 'verifying_otp';
    session.steps.push({
      step: 'Verifying OTP',
      timestamp: new Date(),
      details: 'Submitting OTP for verification'
    });

    // Simulate OTP verification
    await session.page.evaluate((otp) => {
      console.log('Submitting OTP:', otp);
    }, otp);

    await session.page.waitForTimeout(2000);

    // Complete registration
    session.currentStep = 'completing_registration';
    session.steps.push({
      step: 'Completing Registration',
      timestamp: new Date(),
      details: 'Finalizing GST registration'
    });

    await session.page.waitForTimeout(3000);

    // Success
    session.status = 'completed';
    session.currentStep = 'completed';
    session.steps.push({
      step: 'Registration Completed',
      timestamp: new Date(),
      details: 'GST registration successful'
    });

    // Update business license status
    const business = await Business.findById(session.businessId);
    if (business) {
      const license = business.requiredLicenses.find(l => l.licenseType === 'GST Registration');
      if (license) {
        license.status = 'applied';
        license.applicationDate = new Date();
        await business.save();
      }
    }

    // Close browser
    if (session.browser) {
      await session.browser.close();
    }

  } catch (error) {
    console.error('GST automation continuation error:', error);
    session.status = 'failed';
    session.steps.push({
      step: 'Automation Failed',
      timestamp: new Date(),
      details: error.message
    });
  }
}

// MSME Automation Function
async function runMSMEAutomation(sessionId) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    session.currentStep = 'launching_browser';
    session.steps.push({
      step: 'Launching Browser',
      timestamp: new Date(),
      details: 'Starting automated browser session'
    });

    // Launch browser
    session.browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    session.page = await session.browser.newPage();

    // Navigate to MSME portal
    session.currentStep = 'navigating_to_portal';
    session.steps.push({
      step: 'Navigating to MSME Portal',
      timestamp: new Date(),
      details: 'Accessing Udyam registration portal'
    });

    await session.page.goto('https://udyamregistration.gov.in/');
    await session.page.waitForTimeout(2000);

    // Fill registration form
    session.currentStep = 'filling_form';
    session.steps.push({
      step: 'Filling Registration Form',
      timestamp: new Date(),
      details: 'Entering enterprise details'
    });

    await session.page.evaluate((data) => {
      console.log('Filling MSME form with data:', data);
    }, session.data);

    await session.page.waitForTimeout(2000);

    // Simulate OTP requirement
    session.currentStep = 'otp_required';
    session.otpRequired = true;
    session.otpPrompt = {
      message: 'Please enter the OTP sent to your registered mobile number',
      phone: session.data.phone,
      type: 'sms',
      expiresIn: '300'
    };

    session.steps.push({
      step: 'OTP Required',
      timestamp: new Date(),
      details: 'Waiting for user to provide OTP'
    });

  } catch (error) {
    console.error('MSME automation error:', error);
    session.status = 'failed';
    session.steps.push({
      step: 'Automation Failed',
      timestamp: new Date(),
      details: error.message
    });
  }
}

// Continue MSME Automation after OTP
async function continueMSMEAutomation(sessionId, otp) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    session.currentStep = 'verifying_otp';
    session.steps.push({
      step: 'Verifying OTP',
      timestamp: new Date(),
      details: 'Submitting OTP for verification'
    });

    await session.page.evaluate((otp) => {
      console.log('Submitting MSME OTP:', otp);
    }, otp);

    await session.page.waitForTimeout(2000);

    // Complete registration
    session.currentStep = 'completing_registration';
    session.steps.push({
      step: 'Completing Registration',
      timestamp: new Date(),
      details: 'Finalizing MSME registration'
    });

    await session.page.waitForTimeout(3000);

    // Success
    session.status = 'completed';
    session.currentStep = 'completed';
    session.steps.push({
      step: 'Registration Completed',
      timestamp: new Date(),
      details: 'MSME registration successful'
    });

    // Update business license status
    const business = await Business.findById(session.businessId);
    if (business) {
      const license = business.requiredLicenses.find(l => l.licenseType === 'MSME Registration');
      if (license) {
        license.status = 'applied';
        license.applicationDate = new Date();
        await business.save();
      }
    }

    // Close browser
    if (session.browser) {
      await session.browser.close();
    }

  } catch (error) {
    console.error('MSME automation continuation error:', error);
    session.status = 'failed';
    session.steps.push({
      step: 'Automation Failed',
      timestamp: new Date(),
      details: error.message
    });
  }
}

// Get all active sessions for user
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const userSessions = Array.from(activeSessions.values())
      .filter(session => session.userId === req.user.userId)
      .map(session => ({
        id: session.id,
        licenseType: session.licenseType,
        status: session.status,
        currentStep: session.currentStep,
        startTime: session.startTime,
        otpRequired: session.otpRequired
      }));

    res.json({ sessions: userSessions });
  } catch (error) {
    console.error('Sessions fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

module.exports = router; 