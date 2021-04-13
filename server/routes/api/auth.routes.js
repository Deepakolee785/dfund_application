const router = require('express').Router()
const fetch = require('node-fetch')

const User = require('../../models/User')
const Campaign = require('../../models/Campaign')
const Transaction = require('../../models/Transaction')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middlewares/auth')
const {
	registerValidation,
	loginValidation,
} = require('../../validation/auth.validation')

const validateHuman = async token => {
	const secret = process.env.RECAPTCHA_SECRET_KEY
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
		{
			method: 'POST',
		}
	)
	const data = await response.json()
	return data.success
	// return true
}

router.post('/register', async (req, res) => {
	const isHuman = await validateHuman(req.body.recaptcha)
	if (!isHuman) {
		res.status(400).json({ message: 'It seems your are a bot!' })
		return
	}
	// Validate
	const { error } = registerValidation(req.body)
	if (error) return res.status(400).send({ message: error.details[0].message })
	// Check if user already exists
	const walletExist = await User.findOne({ wallet: req.body.wallet })
	if (walletExist)
		return res.status(400).send({
			message: 'Wallet is already used.',
		})
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist)
		return res.status(400).send({
			message: 'Email is already taken.',
		})

	const usernameExist = await User.findOne({ username: req.body.username })
	if (usernameExist)
		return res.status(400).send({
			message: 'Username is already used.',
		})
	// Hash the password
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)
	// create new user
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		wallet: req.body.wallet,
		password: hashPassword,
		imageHash: req.body.imageHash,
		country: req.body.country,
	})
	try {
		const savedUser = await user.save()
		res.send({ user: savedUser._id, message: 'Successfully registered' })
	} catch (error) {
		res.status(400).send(error)
	}
})

router.post('/login', async (req, res) => {
	const isHuman = await validateHuman(req.body.recaptcha)
	if (!isHuman) {
		res.status(400).json({ message: 'It seems your are a bot!' })
		return
	}
	// Validate
	const { error } = loginValidation(req.body)
	if (error)
		return res.status(400).send({
			message: error.details[0].message,
		})

	// Check if email already exists
	const user = await User.findOne({
		username: req.body.username,
		wallet: req.body.wallet,
	})

	// console.log('checked' + user)
	if (!user)
		return res.status(400).send({ message: 'Username or wallet is incorrect.' })

	// Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword)
		return res.status(400).send({ message: 'Password is incorrect.' })

	// generate/assign token
	const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY)
	res.header('auth-token', token).send({ token })
})

// @route GET api/auth
// @desc Get login user
// @access private
router.get('/authUser', auth, async (req, res) => {
	try {
		const user = await User.findById(req.id).select('-password')
		const campaigns = await Campaign.find({ user: user._id })
		const transactions = await Transaction.find({ user: user._id })

		const { _id, username, email, wallet, imageHash, country, updatedAt } = user

		const data = {
			_id,
			username,
			email,
			wallet,
			imageHash,
			country,
			updatedAt,
			userCampaigns: campaigns,
			userTransactions: transactions,
		}
		res.json(data)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

module.exports = router
