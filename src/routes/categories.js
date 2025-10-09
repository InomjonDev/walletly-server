const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const categorySchema = require('../validations/category')
const Category = require('../models/Category')

router.use(authenticate)

// Get all categories for user
router.get('/', async (req, res) => {
	try {
		const categories = await Category.find({ userId: req.user.uid })
		res.json(categories)
	} catch (err) {
		res.status(500).json({ error: 'Server error' })
	}
})

// Add new category
router.post('/', async (req, res) => {
	const { error } = categorySchema.validate(req.body)
	if (error) return res.status(400).json({ error: error.details[0].message })

	try {
		const newCategory = new Category({
			...req.body,
			userId: req.user.uid,
		})

		const saved = await newCategory.save()
		res.status(201).json(saved)
	} catch (err) {
		res.status(500).json({ error: 'Failed to create category' })
	}
})

// Update category
router.put('/:id', async (req, res) => {
	const { error } = categorySchema.validate(req.body)
	if (error) return res.status(400).json({ error: error.details[0].message })

	try {
		const updated = await Category.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.uid },
			req.body,
			{ new: true }
		)

		if (!updated) return res.status(404).json({ error: 'Category not found' })
		res.json(updated)
	} catch (err) {
		res.status(500).json({ error: 'Failed to update category' })
	}
})

// Delete category
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.uid,
		})

		if (!deleted) return res.status(404).json({ error: 'Category not found' })
		res.json({ message: 'Deleted successfully' })
	} catch (err) {
		res.status(500).json({ error: 'Failed to delete category' })
	}
})

module.exports = router
