const router = require('express').Router()
const auth = require('../../middlewares/auth')
// const admin_auth = require('../../middlewares/admin_auth')
const Transaction = require('../../models/Transaction')

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
		res.send({
			message: 'Successfully saved transaction.',
		})
	} catch (error) {
		res.status(400).send(error)
	}
})
// router.post('/get-campaign-request', admin_auth, async (req, res) => {
// 	// console.log(req.body)
// 	const { campaign } = req.body
// 	const currentCampaign = await Campaign.find({ _id: campaign })
// 	if (!currentCampaign)
// 		return res.status(400).json({ message: 'Campaign not found.' })

// 	const campaignRequests = await Request.find({ campaign })

// 	// console.log(currentCampaign[0])

// 	try {
// 		res.send({
// 			campaignRequests,
// 		})
// 	} catch (error) {
// 		res.status(400).send(error)
// 	}
// })
module.exports = router
