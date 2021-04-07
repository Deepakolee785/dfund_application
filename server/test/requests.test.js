//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Request = require('../models/Request')

let { requestDetail, loginUser, campaign, adminUserLogin } = require('./data')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Request', () => {
	// beforeEach(done => {
	// 	Request.deleteMany({}, err => {
	// 		done()
	// 	})
	// })

	let token
	let campaignAdd

	describe('/POST create request', () => {
		it('Should save new spending request of campaign', done => {
			// create campaign
			chai
				.request(server)
				.post('/api/campaign/save-campaign')
				.send(campaign)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('campaign_add')
					res.body.should.have
						.property('message')
						.eql('Successfully registered')

					// console.log(res.body)
					campaignAdd = res.body.campaign_add

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
							token = res.body.token

							// create request
							chai
								.request(server)
								.post('/api/request/save-request')
								.send({ ...requestDetail, campaign: campaignAdd })
								.set('x-auth-token', token)
								.end((err, res) => {
									res.should.have.status(200)
									res.body.should.be.a('object')
									res.body.should.have.property('campaign')
									res.body.should.have.property('request')
									res.body.should.have
										.property('message')
										.eql('Successfully saved request.')
									done()
								})
						})
				})
		})
		it('Should get requests that related to specific campaign', done => {
			chai
				.request(server)
				.post('/api/admin/login')
				.send(adminUserLogin)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('object')
					res.body.should.have.property('token')
					let admin_token = res.body.token

					// get all campaigns using jwt token
					chai
						.request(server)
						.post('api/request/get-campaign-request')
						.send({ campaign: campaignAdd })
						.set('a-auth-token', admin_token)
						.end((err, res) => {
							done()
						})
				})
		})
	})
})
