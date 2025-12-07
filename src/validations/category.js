const Joi = require('joi')

const categorySchema = Joi.object({
	userId: Joi.string().min(1).required(),
	name: Joi.string().min(1).max(50).required(),
	type: Joi.string().valid('income', 'expense').required(),
	cat_id: Joi.string().min(1).required(),
	cat_icon: Joi.string().min(1).required(),
})

module.exports = categorySchema
