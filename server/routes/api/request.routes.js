const router = require('express').Router()
const auth = require('../../middlewares/auth')
const admin_auth = require('../../middlewares/admin_auth')
const Request = require('../../models/Request')
const Campaign = require('../../models/Campaign')
const Approver = require('../../models/Approver')
const User = require('../../models/User')
const sendApproveEmails = require('../../services/nodemailer')

router.post('/save-request', auth, async (req, res) => {
	// console.log(req.body)
	const {
		campaign,
		description,
		maker,
		recipient,
		value,
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		status,
		to,
		transactionHash,
		complete,
	} = req.body
	const currentCampaign = await Campaign.find({ addr: campaign })
	const approvers = await Approver.find({ campaign })

	const approversEmail = await Promise.all(
		Array(approvers.length)
			.fill()
			.map((element, index) => {
				return User.findById(approvers[index].user)
					.then(data => {
						return data.email
					})
					.catch(err => null)
			})
	)

	// console.log(approversEmail)
	// return
	const request = new Request({
		campaign: currentCampaign[0]._id,
		description,
		maker,
		recipient,
		value,
		blockHash,
		blockNumber,
		cumulativeGasUsed,
		status,
		to,
		transactionHash,
		complete,
	})
	try {
		const savedRequest = await request.save()
		sendApproveEmails({
			emailList: approversEmail,
			campaingAddress: campaign,
			title: currentCampaign[0].title,
			request: description,
			amount: value,
			recipient: recipient,
		})
		res.send({
			request: savedRequest._id,
			campaign: savedRequest.campaign,
			message: 'Successfully saved request.',
		})
	} catch (error) {
		res.status(400).send(error)
	}
})
router.post('/get-campaign-request', admin_auth, async (req, res) => {
	// console.log(req.body)
	const { campaign } = req.body
	const currentCampaign = await Campaign.find({ _id: campaign })
	if (!currentCampaign)
		return res.status(400).json({ message: 'Campaign not found.' })

	const campaignRequests = await Request.find({ campaign })

	// console.log(currentCampaign[0])

	try {
		res.send({
			campaignRequests,
		})
	} catch (error) {
		res.status(400).send(error)
	}
})
module.exports = router
