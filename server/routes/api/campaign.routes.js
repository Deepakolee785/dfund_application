const router = require('express').Router()
const auth = require('../../middlewares/auth')
const Campaign = require('../../models/Campaign')

router.post('/save-campaign', async (req, res) => {
	// console.log(req.body)
	const {
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		type,
		addr,
		category,
		country,
		creator,
		deadline,
		description,
		goalAmount,
		imageHash,
		minimumContribution,
		title,
		status,
		to,
		transactionHash,
	} = req.body
	const campaign = new Campaign({
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		type,
		addr,
		category,
		country,
		creator,
		deadline,
		description,
		goalAmount,
		imageHash,
		minimumContribution,
		title,
		status,
		to,
		transactionHash,
	})
	try {
		const savedCampaign = await campaign.save()
		res.send({
			campaign_add: savedCampaign.addr,
			message: 'Successfully registered',
		})
	} catch (error) {
		res.status(400).send(error)
	}
})

module.exports = router
