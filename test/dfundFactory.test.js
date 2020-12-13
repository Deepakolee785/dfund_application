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
			await dfundFactory.createCampaign(
				temp.title,
				temp.desc,
				temp.desc,
				temp.country,
				temp.goal,
				temp.min,
				temp.deadline,
				temp.imageHash,
				{
					from: accounts[0],
				}
			)
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
			assert(result.creator, accounts[0], 'Creator is OK')
			assert(result.title, temp.title, 'Title is OK')
			assert(result.description, temp.desc, 'Description is OK')
			assert(result.category, temp.category, 'Category is OK')
			assert(result.country, temp.country, 'Country is OK')
			assert(result.goalAmount.toNumber(), temp.goal, 'Goal amount is OK')
			assert(
				result.minimumContrubution.toNumber(),
				temp.min,
				'Min contribution is OK'
			)
			assert(result.deadline.toNumber(), temp.deadline, 'Deadline is OK')
			assert(result.imageHash, temp.imageHash, 'Imagehash is OK')
		})
	})
})
