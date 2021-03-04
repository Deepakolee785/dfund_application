const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		addr: {
			type: String,
			required: true,
		},

		blockHash: {
			type: String,
			required: true,
		},
		blockNumber: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		creator: {
			type: String,
			required: true,
		},
		cumulativeGasUsed: {
			type: String,
			required: true,
		},
		deadline: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		goalAmount: {
			type: String,
			required: true,
		},
		imageHash: {
			type: String,
			required: true,
		},
		minimumContribution: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		transactionHash: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Campaign', CampaignSchema)
