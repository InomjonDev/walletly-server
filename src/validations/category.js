const Joi = require('joi')

const categorySchema = Joi.object({
	name: Joi.string().min(1).max(50).required(),
	type: Joi.string().valid('income', 'expense').required(),
	cat_id: Joi.string().min(1).required(),
})

module.exports = categorySchema
