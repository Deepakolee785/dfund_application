//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Campaign = require('../models/Campaign')

let { campaign } = require('./data')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('Campaigns', () => {
	beforeEach(done => {
		Campaign.deleteMany({}, err => {
			done()
		})
	})
	/**
	 * 1.
	 */
	describe('/POST campaigns', () => {
		it('it should save the campaigns', done => {
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
					done()
				})
		})
	})
	/**
	 * 2.
	 */
	describe('/GET campaigns', () => {
		it('it should get all the campaigns', done => {
			// save brand new campaign
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

					// login as admin to get access jwt token
					chai
						.request(server)
						.post('/api/admin/login')
						.send({ email: 'deepak@gmail.com', password: '123456' })
						.end((err, res) => {
							res.should.have.status(200)
							res.body.should.be.a('object')
							res.body.should.have.property('token')
							let token = res.body.token

							// get all campaigns using jwt token
							chai
								.request(server)
								.get('/api/campaign/get-campaigns')
								.set('a-auth-token', token)
								.end((err, res) => {
									res.should.have.status(200)
									res.body.should.be.a('object')
									res.body.should.have.property('data')
									res.body.data[0].should.have.property('addr')
									// console.log(res.body)
									done()
								})
						})
				})
		})
	})
	//
})
