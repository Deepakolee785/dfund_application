const Joi = require('@hapi/joi')

// const pattern =
// 	'/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/'
const pattern =
	'/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/'

// Register Validation
const registerValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(5).required(),
		email: Joi.string().min(6).required().email(),
		wallet: Joi.string().required(),
		// password: Joi.string().min(6).required(),
		password: Joi.string().required().min(6),
		imageHash: Joi.string().optional(),
		country: Joi.string().required(),
		recaptcha: Joi.string().required(),
		termsAndContions: Joi.string().required(),
	})
	return schema.validate(data)
}

// Login Validation
const loginValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(5).required(),
		password: Joi.string().required(),
		wallet: Joi.string().required(),
		recaptcha: Joi.string().required(),
	})
	return schema.validate(data)
}

// Admin Register Validation
const adminRegisterValidation = data => {
	const schema = Joi.object({
		name: Joi.string().min(4).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	})
	return schema.validate(data)
}

// Login Validation
const adminLoginValidation = data => {
	const schema = Joi.object({
		email: Joi.string().min(5).required(),
		password: Joi.string().required(),
	})
	return schema.validate(data)
}

module.exports = {
	registerValidation,
	loginValidation,
	adminLoginValidation,
	adminRegisterValidation,
}
