const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Paused', 'Completed'],
    default: 'Draft'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  budget: {
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  targetAudience: {
    demographics: {
      ageRange: {
        min: Number,
        max: Number
      },
      locations: [String],
      interests: [String]
    }
  },
  channels: [{
    type: String,
    enum: ['Facebook', 'Email', 'Twitter', 'Website', 'Phone']
  }],
  metrics: {
    leads: {
      type: Number,
      default: 0
    },
    conversions: {
      type: Number,
      default: 0
    },
    costPerLead: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
campaignSchema.index({ status: 1 });
campaignSchema.index({ startDate: -1 });
campaignSchema.index({ createdBy: 1 });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign; 