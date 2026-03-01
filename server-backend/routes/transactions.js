// Transaction routes
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// GET all transactions for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific transaction by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    // Verify ownership
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new transaction (purchase, payment, etc.)
router.post('/', authenticateToken, async (req, res) => {
  const { type, amount, description, currency = 'USD' } = req.body;

  // Validate input
  if (!type || !amount) {
    return res.status(400).json({ message: 'Type and amount are required' });
  }

  const transaction = new Transaction({
    userId: req.user.id,
    type, // 'purchase', 'refund', 'payment', etc.
    amount,
    description,
    currency,
    status: 'pending'
  });

  try {
    const savedTransaction = await transaction.save();
    
    // Update user balance
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { balance: amount }
    });

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE transaction status
router.patch('/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify ownership
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (status) transaction.status = status;
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a transaction
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify ownership
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
