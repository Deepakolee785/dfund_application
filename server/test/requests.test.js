//During the test the env variable is set to test
process.env.NODE_ENV = 'test'
let mongoose = require('mongoose')
let Request = require('../models/Request')

let { requestDetail, loginUser } = require('./data')

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
	describe('/POST create request', () => {
		it('Should save new spending request of campaign', done => {
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

					// chai
					// 	.request(server)
					// 	.post('/api/request/save-request')
					// 	.send(requestDetail)
					// 	.set('x-auth-token', token)
					// 	.end((err, res) => {
					// 		console.log(res)
					// 		done()
					// 	})
					done()
				})
		})
	})
})
