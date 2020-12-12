const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: String,
		required: true,
		min: 5,
	},
	{
		email: String,
		required: true,
		min: 6,
		max: 255,
	},
	{
		wallet: String,
		required: true,
	},
	{
		password: String,
		required: true,
		min: 6,
		max: 1024,
	},
	{
		imageHash: String,
		required: false,
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
