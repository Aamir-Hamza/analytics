const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Campaign = require('../models/Campaign');
const Lead = require('../models/Lead');
const { auth } = require('../middleware/auth');

// Get all campaigns with pagination and filters
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    
    // Apply filters
    if (req.query.status) query.status = req.query.status;
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const campaigns = await Campaign.find(query)
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name');

    const total = await Campaign.countDocuments(query);

    res.json({
      campaigns,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new campaign
router.post('/', auth, [
  body('name').trim().notEmpty(),
  body('startDate').isISO8601(),
  body('endDate').optional().isISO8601(),
  body('channels').isArray(),
  body('channels.*').isIn(['Facebook', 'Email', 'Twitter', 'Website', 'Phone'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const campaign = new Campaign({
      ...req.body,
      createdBy: req.user._id
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get campaign by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('createdBy', 'name');

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Get campaign leads
    const leads = await Lead.find({ campaign: campaign._id })
      .select('name email status score')
      .sort({ createdAt: -1 });

    res.json({
      campaign,
      leads
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update campaign
router.patch('/:id', auth, [
  body('status').optional().isIn(['Draft', 'Active', 'Paused', 'Completed']),
  body('endDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'status', 'startDate', 'endDate', 'budget', 'channels', 'targetAudience'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    updates.forEach(update => campaign[update] = req.body[update]);
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get campaign metrics
router.get('/:id/metrics', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const leads = await Lead.find({ campaign: campaign._id });
    
    const metrics = {
      totalLeads: leads.length,
      qualifiedLeads: leads.filter(lead => lead.status === 'Qualified').length,
      conversionRate: leads.length > 0 
        ? (leads.filter(lead => lead.status === 'Converted').length / leads.length) * 100 
        : 0,
      averageScore: leads.length > 0 
        ? leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length 
        : 0,
      leadsBySource: leads.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {}),
      leadsByStatus: leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {})
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete campaign
router.delete('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Remove campaign reference from leads
    await Lead.updateMany(
      { campaign: campaign._id },
      { $unset: { campaign: 1 } }
    );

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 