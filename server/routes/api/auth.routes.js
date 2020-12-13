const router = require('express').Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
	registerValidation,
	loginValidation,
} = require('../../validation/auth.validation')

router.post('/register', async (req, res) => {
	// Validate
	const { error } = registerValidation(req.body)
	if (error)
		return res.status(400).send({ message: error.details[0].message })
	// Check if user already exists
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist)
		return res.status(400).send({
			msg: 'Email is already taken.',
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
		res.send({ user: savedUser._id, msg: 'Successfully registered' })
	} catch (error) {
		res.status(400).send(error)
	}
})

router.post('/login', async (req, res) => {
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
		return res
			.status(400)
			.send({ message: 'Username or wallet is incorrect.' })

	// Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword)
		return res.status(400).send({ message: 'Password is incorrect.' })

	// generate/assign token
	const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY)
	res.header('auth-token', token).send({ token })
})

module.exports = router
