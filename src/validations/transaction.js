const Joi = require('joi')

const transactionSchema = Joi.object({
	amount: Joi.number().required(),
	type: Joi.string().valid('income', 'expense').required(),
	category: Joi.string().min(1).required(),
	date: Joi.date().optional(),
	notes: Joi.string().allow('').optional(),
})

module.exports = transactionSchema
