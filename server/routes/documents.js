const express = require('express');
const multer = require('multer');
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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
    }
  }
});

// Upload document
router.post('/upload', authenticateToken, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name, type } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const document = {
      name: name || req.file.originalname,
      type: type || 'general',
      url: fileUrl,
      uploadedAt: new Date(),
      isVerified: false
    };

    business.documents.push(document);
    await business.save();

    res.json({
      message: 'Document uploaded successfully',
      document
    });
  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// Get all documents for a business
router.get('/', authenticateToken, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    res.json({ documents: business.documents });
  } catch (error) {
    console.error('Documents fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Delete document
router.delete('/:documentId', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const documentIndex = business.documents.findIndex(doc => doc._id.toString() === documentId);
    
    if (documentIndex === -1) {
      return res.status(404).json({ error: 'Document not found' });
    }

    business.documents.splice(documentIndex, 1);
    await business.save();

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Document delete error:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// Update document verification status
router.patch('/:documentId/verify', authenticateToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const { isVerified } = req.body;

    const business = await Business.findOne({ userId: req.user.userId });

    if (!business) {
      return res.status(404).json({ error: 'Business profile not found' });
    }

    const document = business.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    document.isVerified = isVerified;
    await business.save();

    res.json({
      message: 'Document verification status updated',
      document
    });
  } catch (error) {
    console.error('Document verification error:', error);
    res.status(500).json({ error: 'Failed to update document verification' });
  }
});

module.exports = router; 