/**
 * ======== disable captcha check
 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let User = require('../models/User')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

let { user, loginUser } = require('./data')

chai.use(chaiHttp)

describe('User', () => {
	beforeEach(done => {
		User.deleteMany({}, err => {
			done()
		})
	})
	describe('/POST register user', () => {
		it('Should register new user', done => {
			chai
				.request(server)
				.post('/api/user/register')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('user')
					res.body.should.have
						.property('message')
						.eql('Successfully registered')

					done()
				})
		})
	})

	/**
	 *
	 */
	describe('/POST user login', () => {
		beforeEach(done => {
			User.deleteMany({}, err => {
				done()
			})
		})
		it('Should be able to login from newly registered credentials', done => {
			//register
			chai
				.request(server)
				.post('/api/user/register')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('user')
					res.body.should.have
						.property('message')
						.eql('Successfully registered')

					// login
					chai
						.request(server)
						.post('/api/user/login')
						.send(loginUser)
						.end((err, res) => {
							// console.log('res', res.body)
							res.should.have.status(200)
							res.body.should.be.a('object')
							res.body.should.have.property('token')
							done()
						})
				})
		})

		it('Should get auth user using user jwt token generated while logging in', done => {
			chai
				.request(server)
				.post('/api/user/register')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('user')
					res.body.should.have
						.property('message')
						.eql('Successfully registered')

					// login
					chai
						.request(server)
						.post('/api/user/login')
						.send(loginUser)
						.end((err, res) => {
							// console.log('res', res.body)
							res.should.have.status(200)
							res.body.should.be.a('object')
							res.body.should.have.property('token')

							let token = res.body.token

							//
							chai
								.request(server)
								.get('/api/user/authUser')
								.set('x-auth-token', token)
								.end((err, res) => {
									// console.log('res', res.body)
									res.should.have.status(200)
									res.body.should.be.a('object')
									res.body.should.have.property('username').eql('test_username')
									done()
								})
						})
				})
		})
	})
})
