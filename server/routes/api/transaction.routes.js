const router = require('express').Router()
const auth = require('../../middlewares/auth')
const admin_auth = require('../../middlewares/admin_auth')
const Transaction = require('../../models/Transaction')
const Campaign = require('../../models/Campaign')
const Approver = require('../../models/Approver')

router.post('/save-transaction', auth, async (req, res) => {
	// console.log(req.body)
	const {
		user,
		sender,
		amount,
		reciver,
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		status,
		transactionHash,
		projectAddress,
		transactionType,
		isApprover,
	} = req.body
	// return

	const transaction = new Transaction({
		user,
		sender,
		amount,
		reciver,
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		status,
		transactionHash,
		projectAddress,
		transactionType,
	})

	try {
		const savedtransaction = await transaction.save()

		if (isApprover) {
			const approver = new Approver({
				campaign: projectAddress,
				user,
			})
			await approver.save()
		}

		res.send({
			message: !isApprover
				? 'Successfully saved transaction.'
				: 'Successfully save transaction and added in approver list.',
		})
	} catch (error) {
		res.status(400).send(error)
	}
})
router.post('/get-campaign-transactions', admin_auth, async (req, res) => {
	// console.log(req.body)
	const { campaign } = req.body
	const currentCampaign = await Campaign.find({ addr: campaign })
	if (!currentCampaign)
		return res.status(400).json({ message: 'Campaign not found.' })
	// console.log(campaign)
	const campaignTransactions = await Transaction.find({
		projectAddress: campaign,
	})

	// console.log(campaignTransactions)

	try {
		res.send({
			campaignTransactions,
		})
	} catch (error) {
		res.status(400).send(error)
	}
})

router.get('/get-transactions', admin_auth, async (req, res) => {
	try {
		const transactions = await Transaction.find({})
		// console.log(campaigns)
		res.json({ transactions })
	} catch (error) {
		res.status(400).send(error)
	}
})
module.exports = router
