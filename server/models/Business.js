const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    enum: [
      'sole_proprietorship',
      'partnership',
      'private_limited',
      'public_limited',
      'llp',
      'one_person_company'
    ]
  },
  industry: {
    type: String,
    required: true,
    enum: [
      'food_processing',
      'textile',
      'it_software',
      'tourism',
      'msme',
      'electronics',
      'film',
      'renewable_energy',
      'aviation',
      'pharmaceuticals',
      'logistics',
      'electric_vehicles',
      'defence_aerospace'
    ]
  },
  location: {
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    website: String
  },
  businessDetails: {
    description: String,
    employeeCount: {
      type: Number,
      min: 1
    },
    annualTurnover: {
      type: Number,
      min: 0
    },
    investmentAmount: {
      type: Number,
      min: 0
    }
  },
  requiredLicenses: [{
    licenseType: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    description: String,
    estimatedTime: String,
    estimatedCost: Number,
    isRequired: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['pending', 'applied', 'approved', 'rejected'],
      default: 'pending'
    },
    applicationDate: Date,
    approvalDate: Date,
    nftTokenId: String,
    nftTransactionHash: String
  }],
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected'],
    default: 'draft'
  },
  aiRecommendations: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
businessSchema.index({ userId: 1 });
businessSchema.index({ industry: 1 });
businessSchema.index({ 'location.state': 1, 'location.city': 1 });

// Method to get business summary
businessSchema.methods.getSummary = function() {
  return {
    id: this._id,
    businessName: this.businessName,
    businessType: this.businessType,
    industry: this.industry,
    location: this.location,
    status: this.status,
    requiredLicensesCount: this.requiredLicenses.length,
    approvedLicensesCount: this.requiredLicenses.filter(l => l.status === 'approved').length
  };
};

module.exports = mongoose.model('Business', businessSchema); 