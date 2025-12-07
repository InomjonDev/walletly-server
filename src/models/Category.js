const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['income', 'expense'],
		required: true,
	},
	cat_id: {
		type: String,
		require: true,
	},
	cat_icon: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Category', categorySchema)
