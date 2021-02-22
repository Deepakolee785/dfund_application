const router = require('express').Router()
const Admin = require('../../models/Admin')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
	adminLoginValidation,
	adminRegisterValidation,
} = require('../../validation/auth.validation')
const auth_admin = require('../../middlewares/admin_auth')

router.post('/register', async (req, res) => {
	// Validate
	const { error } = adminRegisterValidation(req.body)
	if (error)
		return res.status(400).send({ message: error.details[0].message })
	// Check if user already exists
	const adminExist = await Admin.findOne({ email: req.body.email })
	if (adminExist)
		return res.status(400).send({
			message: 'Email is already taken.',
		})
	// Hash the password
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	// create new admin
	const admin = new Admin({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	})

	try {
		const savedAdmin = await admin.save()
		res.send({
			admin: { id: savedAdmin._id, name: savedAdmin.name },
			message: 'Successfully registered admin',
		})
	} catch (error) {
		res.status(400).send(error)
	}
})

router.post('/login', async (req, res) => {
	//validate
	const { error } = adminLoginValidation(req.body)
	if (error)
		return res.status(400).send({
			message: error.details[0].message,
		})
	// Check if email already exists
	const admin = await Admin.findOne({
		email: req.body.email,
	})

	// console.log('checked' + user)
	if (!admin)
		return res
			.status(400)
			.send({ message: 'Email or password is incorrect.' })

	// Check if password is correct
	const validPassword = await bcrypt.compare(
		req.body.password,
		admin.password
	)
	if (!validPassword)
		return res.status(400).send({ message: 'Password is incorrect.' })

	// generate/assign token
	const token = jwt.sign({ _id: admin.id }, process.env.SECRET_KEY)
	res.header('auth-token', token).send({ token })
})

// @route GET
// @desc Get
// @access private
router.get('/authAdmin', auth_admin, async (req, res) => {
	try {
		const admin = await Admin.findById(req.id).select('-password')
		res.json(admin)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})
// @route GET
// @desc Get
// @access private
router.get('/get-all-users', auth_admin, async (req, res) => {
	try {
		// const admin = await Admin.findById(req.id).select('-password')
		const users = await User.find({}).select('-password')
		// console.log(campaigns)
		res.json({ users })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

module.exports = router
