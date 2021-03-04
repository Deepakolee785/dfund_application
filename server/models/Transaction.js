const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		sender: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
		reciver: {
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
		projectAddress: {
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

		transactionType: {
			type: String,
			required: true,
		},
		transactionHash: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Transaction', TransactionSchema)
