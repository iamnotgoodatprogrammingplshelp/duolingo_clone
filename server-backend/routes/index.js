// Export all routes
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const budgetRoutes = require('./budgets');
const transactionRoutes = require('./transactions');
const analyticsRoutes = require('./analytics');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/budgets', budgetRoutes);
router.use('/transactions', transactionRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
