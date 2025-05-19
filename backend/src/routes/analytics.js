const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');
const { auth } = require('../middleware/auth');

// Get overall analytics
router.get('/overview', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Get total leads and qualified leads
    const leads = await Lead.find(query);
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(lead => lead.status === 'Qualified').length;

    // Get leads by source
    const leadsBySource = leads.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {});

    // Get leads by status
    const leadsByStatus = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});

    // Get leads over time
    const leadsOverTime = await Lead.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          leads: { $sum: 1 },
          qualified: {
            $sum: {
              $cond: [{ $eq: ["$status", "Qualified"] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    // Get campaign performance
    const campaigns = await Campaign.find(query);
    const campaignPerformance = await Promise.all(
      campaigns.map(async (campaign) => {
        const campaignLeads = await Lead.find({ campaign: campaign._id });
        return {
          name: campaign.name,
          leads: campaignLeads.length,
          conversion: campaignLeads.filter(lead => lead.status === 'Converted').length,
          cpl: campaign.budget.amount / campaignLeads.length || 0
        };
      })
    );

    res.json({
      totalLeads,
      qualifiedLeads,
      conversionRate: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
      leadsBySource,
      leadsByStatus,
      leadsOverTime,
      campaignPerformance
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get lead source analytics
router.get('/sources', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const leads = await Lead.find(query);
    
    const sourceAnalytics = leads.reduce((acc, lead) => {
      if (!acc[lead.source]) {
        acc[lead.source] = {
          total: 0,
          qualified: 0,
          converted: 0,
          averageScore: 0,
          scores: []
        };
      }

      acc[lead.source].total++;
      acc[lead.source].scores.push(lead.score);

      if (lead.status === 'Qualified') {
        acc[lead.source].qualified++;
      }
      if (lead.status === 'Converted') {
        acc[lead.source].converted++;
      }

      return acc;
    }, {});

    // Calculate averages and format response
    const formattedAnalytics = Object.entries(sourceAnalytics).map(([source, data]) => ({
      source,
      total: data.total,
      qualified: data.qualified,
      converted: data.converted,
      qualificationRate: (data.qualified / data.total) * 100,
      conversionRate: (data.converted / data.total) * 100,
      averageScore: data.scores.reduce((a, b) => a + b, 0) / data.scores.length
    }));

    res.json(formattedAnalytics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get time-based analytics
router.get('/timeline', auth, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let dateFormat;

    switch (period) {
      case 'day':
        dateFormat = '%Y-%m-%d';
        break;
      case 'week':
        dateFormat = '%Y-%U';
        break;
      case 'month':
        dateFormat = '%Y-%m';
        break;
      default:
        dateFormat = '%Y-%m';
    }

    const timelineData = await Lead.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: dateFormat, date: "$createdAt" } }
          },
          totalLeads: { $sum: 1 },
          qualifiedLeads: {
            $sum: {
              $cond: [{ $eq: ["$status", "Qualified"] }, 1, 0]
            }
          },
          convertedLeads: {
            $sum: {
              $cond: [{ $eq: ["$status", "Converted"] }, 1, 0]
            }
          },
          averageScore: { $avg: "$score" }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    res.json(timelineData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 