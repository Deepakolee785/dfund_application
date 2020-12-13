const DfundFactory = artifacts.require('./DfundFactory.sol')
const Dfund = artifacts.require('./Dfund.sol')

const temp = {
	title: 'Test 1',
	desc: 'Test description',
	category: 'Technology',
	country: 'Nepal',
	goal: 10000,
	min: 100,
	deadline: 1231233,
	imageHash: 'hashhashtest',
}

contract('DfundFactory', accounts => {
	let dfundFactory
	let campaignAddress
	let myCampaign

	beforeEach(async () => {
		dfundFactory = await DfundFactory.deployed()
	})

	describe('Deployment', async () => {
		it('Should deploy the contract successfull!', () => {
			const address = dfundFactory.address
			assert(address !== 0x0)
			assert(address !== '')
			assert(address !== null)
			assert(address !== undefined)
		})
	})

	describe('Campaign Factory', async () => {
		it('Should create a new Campaign', async () => {
			// FOR SUCCESS CASE
			const result = await dfundFactory.createCampaign(
				temp.title,
				temp.desc,
				temp.category,
				temp.country,
				temp.goal,
				temp.min,
				temp.deadline,
				temp.imageHash,
				{
					from: accounts[0],
				}
			)

			const event = result.logs[0].args
			console.log(event)

			assert.equal(event.creator, accounts[0], 'Creator is OK')
			assert.equal(event.title, temp.title, 'Title is OK')
			assert.equal(event.description, temp.desc, 'Description is OK')
			assert.equal(event.category, temp.category, 'Category is OK')
			assert.equal(event.country, temp.country, 'Country is OK')
			assert.equal(
				event.goalAmount.toNumber(),
				temp.goal,
				'Goal amount is OK'
			)
			assert.equal(
				event.minimumContribution.toNumber(),
				temp.min,
				'Min contribution is OK'
			)
			assert.equal(
				event.deadline.toNumber(),
				temp.deadline,
				'Deadline is OK'
			)
			assert.equal(event.imageHash, temp.imageHash, 'Imagehash is OK')

			// FOR FAILURE CASE
			try {
				await dfundFactory.createCampaign({ from: accounts[0] })
				assert(false)
				return
			} catch (error) {
				assert(true)
				return
			}
		})
		it('Should get all campaign addresses', async () => {
			const addresses = await dfundFactory.getDeployedCampaigns()
			campaignAddress = addresses[0]

			assert(campaignAddress !== 0x0)
			assert(campaignAddress !== '')
			assert(campaignAddress !== null)
			assert(campaignAddress !== undefined)
		})
	})

	describe('Campaign', () => {
		it('Should deploy campaign from campaign address', async () => {
			myCampaign = await Dfund.at(campaignAddress)

			assert(myCampaign.address !== 0x0)
			assert(myCampaign.address !== '')
			assert(myCampaign.address !== null)
			assert(myCampaign.address !== undefined)
		})
		it('Should get campaign details', async () => {
			const result = await myCampaign.campaign()
			assert.equal(result.creator, accounts[0], 'Creator is OK')
			assert.equal(result.title, temp.title, 'Title is OK')
			assert.equal(result.description, temp.desc, 'Description is OK')
			assert.equal(result.category, temp.category, 'Category is OK')
			assert.equal(result.country, temp.country, 'Country is OK')
			assert.equal(
				result.goalAmount.toNumber(),
				temp.goal,
				'Goal amount is OK'
			)
			assert.equal(
				result.minimumContrubution.toNumber(),
				temp.min,
				'Min contribution is OK'
			)
			assert.equal(
				result.deadline.toNumber(),
				temp.deadline,
				'Deadline is OK'
			)
			assert.equal(result.imageHash, temp.imageHash, 'Imagehash is OK')
		})

		it('Should allow to fund in campaign and add in contribution list', async () => {
			const result = await myCampaign.fund({
				value: '50', //wei
				from: accounts[1],
			})

			// Event if emitted
			assert.ok(result.logs[0].args)

			// added to contribution list
			const isContributor = await myCampaign.contributions(accounts[1])
			assert.ok(isContributor)
		})
		it('Should add contributor in approver list if funded amount is more than min contribution', async () => {
			const result = await myCampaign.fund({
				value: '1000', //wei
				from: accounts[1],
			})

			// Event if emitted
			assert.ok(result.logs[0].args)

			// added to contribution list
			const isContributor = await myCampaign.contributions(accounts[1])
			assert.ok(isContributor)

			// added to approver list
			const isApprover = await myCampaign.approvers(accounts[1])
			assert.ok(isApprover)
		})
		it('Should not add contributor to approver list if funded amount is less than min contribution', async () => {
			const result = await myCampaign.fund({
				value: '10', //wei
				from: accounts[2],
			})

			// Event if emitted
			assert.ok(result.logs[0].args)

			// added to contribution list
			const isContributor = await myCampaign.contributions(accounts[2])
			assert.ok(isContributor)

			// added to approver list
			const isApprover = await myCampaign.approvers(accounts[2])
			assert.ok(!isApprover)
		})
		it('Should allow campaign creator to make a spending request', async () => {
			const result = await myCampaign.createRequest(
				'DO something',
				10,
				accounts[1],
				{
					from: accounts[0],
				}
			)

			const request = await myCampaign.requests(0)

			assert.equal('DO something', request.description)
		})
		it('Should not allow other user except campaign creator to make a spending request', async () => {
			try {
				await myCampaign.createRequest(
					'DO something',
					10,
					accounts[1],
					{
						from: accounts[1],
					}
				)
				assert(false)
				return
			} catch (error) {
				assert(true)
				return
			}
		})
	})
})
