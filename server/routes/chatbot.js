const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Business = require('../models/Business');
const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Knowledge base for business licenses and approvals
const LICENSE_KNOWLEDGE_BASE = {
  food_processing: {
    licenses: [
      {
        name: 'FSSAI License',
        department: 'Food Safety and Standards Authority of India',
        description: 'Required for food processing and manufacturing',
        estimatedTime: '15-30 days',
        estimatedCost: 5000,
        requirements: ['Business registration', 'Food safety plan', 'Infrastructure details']
      },
      {
        name: 'GST Registration',
        department: 'Central Board of Indirect Taxes and Customs',
        description: 'Goods and Services Tax registration',
        estimatedTime: '7-15 days',
        estimatedCost: 0,
        requirements: ['PAN card', 'Business address proof', 'Bank account details']
      }
    ]
  },
  textile: {
    licenses: [
      {
        name: 'Handloom Registration',
        department: 'Ministry of Textiles',
        description: 'Registration for handloom and textile business',
        estimatedTime: '10-20 days',
        estimatedCost: 2000,
        requirements: ['Business registration', 'Weaving details', 'Product samples']
      },
      {
        name: 'GST Registration',
        department: 'Central Board of Indirect Taxes and Customs',
        description: 'Goods and Services Tax registration',
        estimatedTime: '7-15 days',
        estimatedCost: 0,
        requirements: ['PAN card', 'Business address proof', 'Bank account details']
      }
    ]
  },
  it_software: {
    licenses: [
      {
        name: 'STPI Registration',
        department: 'Software Technology Parks of India',
        description: 'Registration for software export units',
        estimatedTime: '10-15 days',
        estimatedCost: 0,
        requirements: ['Company registration', 'Export business plan', 'Infrastructure details']
      },
      {
        name: 'GST Registration',
        department: 'Central Board of Indirect Taxes and Customs',
        description: 'Goods and Services Tax registration',
        estimatedTime: '7-15 days',
        estimatedCost: 0,
        requirements: ['PAN card', 'Business address proof', 'Bank account details']
      }
    ]
  }
};

// System prompt for the AI chatbot
const SYSTEM_PROMPT = `You are Saral Vyapar AI Assistant, a helpful business advisor for entrepreneurs in India. Your role is to:

1. Help entrepreneurs understand what licenses and approvals they need for their business
2. Ask clarifying questions to determine their specific requirements
3. Provide accurate information about government procedures
4. Output structured JSON with required licenses

Available industries: food_processing, textile, it_software, tourism, msme, electronics, film, renewable_energy, aviation, pharmaceuticals, logistics, electric_vehicles, defence_aerospace

Business types: sole_proprietorship, partnership, private_limited, public_limited, llp, one_person_company

Always respond in a helpful, professional manner. When you have enough information, output a JSON object with the required licenses.`;

// Chat with AI assistant
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prepare conversation history
    const chatHistory = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Hello! I\'m your Saral Vyapar AI Assistant. I\'m here to help you understand what licenses and approvals you need for your business. Please tell me about your business - what industry are you in, what type of business structure do you have, and where are you located?' }] }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      chatHistory.push({
        role: msg.role,
        parts: [{ text: msg.content }]
      });
    });

    // Add current message
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Start chat
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Generate response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Check if response contains structured data
    let structuredData = null;
    try {
      // Look for JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.log('No structured data found in response');
    }

    // If structured data is found, save to business profile
    if (structuredData && userId) {
      try {
        let business = await Business.findOne({ userId });
        
        if (!business) {
          business = new Business({
            userId,
            businessName: structuredData.businessName || 'Draft Business',
            businessType: structuredData.businessType,
            industry: structuredData.industry,
            location: structuredData.location,
            requiredLicenses: structuredData.requiredLicenses || []
          });
        } else {
          // Update existing business profile
          if (structuredData.businessName) business.businessName = structuredData.businessName;
          if (structuredData.businessType) business.businessType = structuredData.businessType;
          if (structuredData.industry) business.industry = structuredData.industry;
          if (structuredData.location) business.location = structuredData.location;
          if (structuredData.requiredLicenses) business.requiredLicenses = structuredData.requiredLicenses;
        }

        await business.save();
      } catch (error) {
        console.error('Error saving business profile:', error);
      }
    }

    res.json({
      response: text,
      structuredData,
      conversationId: Date.now().toString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      response: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.'
    });
  }
});

// Get license recommendations based on business details
router.post('/get-recommendations', async (req, res) => {
  try {
    const { industry, businessType, location } = req.body;

    if (!industry || !businessType || !location) {
      return res.status(400).json({ error: 'Industry, business type, and location are required' });
    }

    // Get licenses from knowledge base
    const industryLicenses = LICENSE_KNOWLEDGE_BASE[industry] || { licenses: [] };
    
    // Add common licenses
    const commonLicenses = [
      {
        name: 'GST Registration',
        department: 'Central Board of Indirect Taxes and Customs',
        description: 'Goods and Services Tax registration',
        estimatedTime: '7-15 days',
        estimatedCost: 0,
        requirements: ['PAN card', 'Business address proof', 'Bank account details']
      },
      {
        name: 'MSME Registration',
        department: 'Ministry of Micro, Small and Medium Enterprises',
        description: 'Udyam registration for MSME benefits',
        estimatedTime: '1-3 days',
        estimatedCost: 0,
        requirements: ['PAN card', 'Aadhaar card', 'Business details']
      }
    ];

    const allLicenses = [...industryLicenses.licenses, ...commonLicenses];

    res.json({
      industry,
      businessType,
      location,
      requiredLicenses: allLicenses,
      totalEstimatedCost: allLicenses.reduce((sum, license) => sum + (license.estimatedCost || 0), 0),
      totalEstimatedTime: Math.max(...allLicenses.map(license => parseInt(license.estimatedTime.split('-')[1]) || 30))
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get conversation history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real implementation, you would store conversation history in the database
    // For now, we'll return an empty array
    res.json({ conversations: [] });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});

module.exports = router; 