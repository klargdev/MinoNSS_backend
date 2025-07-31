const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const userDB = require('../config/database');

const router = express.Router();

// GET /profile - Protected route that returns user information
router.get('/profile', authenticateToken, (req, res) => {
  try {
    // Get user from database using the ID from JWT token
    const user = userDB.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user information (excluding password)
    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 