const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
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
		password: {
			type: String,
			required: true,
			min: 6,
			max: 1024,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Admin', AdminSchema)
