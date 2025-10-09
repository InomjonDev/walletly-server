const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const transactionSchema = require('../validations/transaction')
const Transaction = require('../models/Transaction')

router.use(authenticate)

// Get all transactions for authenticated user
router.get('/', async (req, res) => {
	try {
		const transactions = await Transaction.find({ userId: req.user.uid }).sort({
			date: -1,
		})
		res.json(transactions)
	} catch (err) {
		res.status(500).json({ error: 'Server error' })
	}
})

// Add new transaction
router.post('/', async (req, res) => {
	const { error } = transactionSchema.validate(req.body)
	if (error) return res.status(400).json({ error: error.details[0].message })

	try {
		const newTransaction = new Transaction({
			...req.body,
			userId: req.user.uid,
		})

		const saved = await newTransaction.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(500).json({ error: 'Failed to create transaction' })
	}
})

// Update a transaction
router.put('/:id', async (req, res) => {
	const { error } = transactionSchema.validate(req.body)
	if (error) return res.status(400).json({ error: error.details[0].message })

	try {
		const updated = await Transaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.uid },
			req.body,
			{ new: true }
		)

		if (!updated)
			return res.status(404).json({ error: 'Transaction not found' })
		res.json(updated)
	} catch (err) {
		res.status(500).json({ error: 'Failed to update transaction' })
	}
})

// Delete a transaction
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Transaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.uid,
		})

		if (!deleted)
			return res.status(404).json({ error: 'Transaction not found' })
		res.json({ message: 'Deleted successfully' })
	} catch (err) {
		res.status(500).json({ error: 'Failed to delete transaction' })
	}
})

module.exports = router
