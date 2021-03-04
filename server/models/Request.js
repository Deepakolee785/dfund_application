const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
	{
		campaign: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Campaign',
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		maker: {
			type: String,
			required: true,
		},
		recipient: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		blockHash: {
			type: String,
			required: true,
		},
		blockNumber: {
			type: String,
			required: true,
		},
		cumulativeGasUsed: {
			type: String,
			required: true,
		},
		status: {
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
		complete: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Request', RequestSchema)
