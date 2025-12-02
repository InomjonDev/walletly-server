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
	icon: {
		type: String,
	},
})

module.exports = mongoose.model('Category', categorySchema)
