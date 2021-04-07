//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Request = require('../models/Request')

let { requestDetail, loginUser, campaign } = require('./data')

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
							let token = res.body.token

							// create request
							chai
								.request(server)
								.post('/api/request/save-request')
								.send({ ...requestDetail, campaign: campaignAdd })
								.set('x-auth-token', token)
								.end((err, res) => {
									console.log(res)
									done()
								})
							done()
						})
				})
		})
	})
})
