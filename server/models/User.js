const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 5,
		},

		email: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		wallet: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 1024,
		},
		imageHash: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', UserSchema)
