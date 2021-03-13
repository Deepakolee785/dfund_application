const mongoose = require('mongoose')

const ApproverSchema = new mongoose.Schema(
	{
		campaign: {
			type: 'string',
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Approver', ApproverSchema)
