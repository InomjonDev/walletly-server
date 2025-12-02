const Joi = require('joi')

const categorySchema = Joi.object({
	name: Joi.string().min(1).max(50).required(),
	icon: Joi.string().optional(),
})

module.exports = categorySchema
