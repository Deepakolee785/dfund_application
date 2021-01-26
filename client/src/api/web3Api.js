import DfundContract from '../contracts/Dfund.json'

export const getAllCampaigns = contract => {
	return contract.methods
		.getDeployedCampaigns()
		.call()
		.then(response => {
			return response
		})
}

export const getCampaignDetails = (web3, campaign) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.campaign()
		.call()
		.then(data => data)
		.catch(err => err)
}
export const fundAmount = (web3, campaign, amount, account) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.fund()
		.send({
			from: account,
			value: `${amount}`,
		})
		.then(data => data)
}
export const getRequestsCount = (web3, campaign) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.getRequestsCount()
		.call()
		.then(res => {
			return res
		})
}
export const getContributionsCount = (web3, campaign) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.contributionCount()
		.call()
		.then(response => {
			return response
		})
}
export const getCampaignSpendingRequests = async (web3, campaign) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.requests()
		.call()
		.then(response => {
			return response
		})
}

export const fromEtherToWei = (web3, ethValue) => {
	return web3.utils.toWei(ethValue, 'ether')
}

export const fromWeiToEther = (web3, weiValue) => {
	return web3.utils.fromWei(weiValue, 'ether')
}
