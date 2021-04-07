/**
 * ======== disable captcha check
 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Admin = require('../models/Admin')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

let { adminUserLogin, adminUser } = require('./data')

chai.use(chaiHttp)

describe('Admin', () => {
	let token
	before(done => {
		Admin.deleteMany({}, err => {
			done()
		})
	})

	describe('/POST register admin', () => {
		it('should register new admin', done => {
			chai
				.request(server)
				.post('/api/admin/register')
				.send(adminUser)
				.end((err, res) => {
					// console.log(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('admin')
					res.body.should.have
						.property('message')
						.eql('Successfully registered admin')
					res.body.admin.should.have.property('id')
					done()
				})
		})
	})

	describe('/POST login user', () => {
		it('should be able to login from newly registered admin', done => {
			chai
				.request(server)
				.post('/api/admin/login')
				.send(adminUserLogin)
				.end((err, res) => {
					// console.log(res)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('token')
					done()
				})
		})
		it('Should get admin user details using jwt token generated while logging in', done => {
			chai
				.request(server)
				.post('/api/admin/login')
				.send(adminUserLogin)
				.end((err, res) => {
					// console.log(res)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('token')
					// done()
					token = res.body.token

					chai
						.request(server)
						.get('/api/admin/authAdmin')
						.set('a-auth-token', token)
						.end((err, res) => {
							res.should.have.status(200)
							res.body.should.be.a('object')
							res.body.should.have.property('_id')
							res.body.should.have.property('name')
							res.body.should.have.property('email')
							done()
						})
				})
		})
	})

	describe('Admin Dashboard', () => {
		it('should get all users(customers) registered in the system', done => {
			chai
				.request(server)
				.get('/api/admin/get-all-users')
				.set('a-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('users')
					res.body.users.should.be.a('array')
					done()
				})
		})
		it('should get all admin users registered in the system', done => {
			chai
				.request(server)
				.get('/api/admin/get-all-admins')
				.set('a-auth-token', token)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('admins')
					res.body.admins.should.be.a('array')
					done()
				})
		})
		it('Should get summary stats of campaigns, transactions, etc for admin dashboard', done => {
			chai
				.request(server)
				.get('/api/admin/dashboard')
				.set('a-auth-token', token)
				.end((err, res) => {
					// console.log(res.body)
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('stats')
					res.body.stats.should.have.property('campaigns')
					res.body.stats.should.have.property('transactions')
					res.body.stats.should.have.property('users')
					res.body.stats.should.have.property('admins')
					//
					res.body.should.have.property('transactionDetails')
					res.body.should.have.property('campaignsDetails')
					done()
				})
		})
	})
})
