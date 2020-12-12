const DfundFactory = artifacts.require('./DfundFactory.sol')

contract('DfundFactory', accounts => {
	let dfundFactory
	let campaignAddress

	before(async () => {
		dfundFactory = await DfundFactory.deployed()
	})

	describe('Deployment', async () => {
		it('Should deploy the contract successfull!', async () => {
			const address = await dfundFactory.address
			assert(address !== 0x0)
			assert(address !== '')
			assert(address !== null)
			assert(address !== undefined)
			assert.ok(address)
		})
	})

	describe('Campaign Creation', () => {
		it('Should create campaign successfully', async () => {
			await dfundFactory.createCampaign(
				'Test 1',
				'Test description',
				'Technology',
				'Nepal',
				10000,
				100,
				1231233,
				'hashhashtest',

				{
					from: accounts[0],
				}
			)
		})
		it('Should get the address of recently created campaign successfully', async () => {
			const result = await dfundFactory.getDeployedCampaigns()
			campaignAddress = result[0]
		})
	})
})
