//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Campaign = require('../models/Campaign')

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
	describe('/POST campaigns', () => {
		it('it should save the campaigns', done => {
			let campaign = {
				user: '60408660681ca13dd8f0b0ff',
				blockHash:
					'0x39e5de45b610ce4e75c483a7388caa3bce6e14acd112e55f930a874c8a8ccfzz',
				blockNumber: 10,
				cumulativeGasUsed: '1554293',
				type: 'mined',
				addr: '0x014cF9AeAb3fE2F1EE42653235BD4307ceb74c04',
				category: 'technology',
				country: 'Nepal',
				creator: '0xa403D17fa67456155972071FCD886B2A14be95B6',
				deadline: '1619756296506',
				description: 'Test description',
				goalAmount: '10',
				imageHash: 'QmWuDcDgqfhwz2GrrHGsoAwW4W28sbwHE7AGiF2fxHN1Sv',
				minimumContribution: '1',
				title: 'test title',
				status: true,
				to: '0xe03135ea9cab1c94b4a938f165ed769198ea9fa2',
				transactionHash:
					'0x8d9bae670ea0ffcaec5b465700c96be90c74fd4016bb86dae8b6639979c6806c',
			}
			chai.request(server)
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
})
