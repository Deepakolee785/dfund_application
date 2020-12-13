const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(5).required(),
		email: Joi.string().min(6).required().email(),
		wallet: Joi.string().required(),
		password: Joi.string().min(6).required(),
		imageHash: Joi.string(),
		country: Joi.string().required(),
	})
	return schema.validate(data)
}

// Login Validation
const loginValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(5).required(),
		password: Joi.string().required(),
		wallet: Joi.string().required(),
	})
	return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
