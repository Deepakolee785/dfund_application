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

export const toWei = (web3, ethValue) => {
	return web3.toWei(ethValue, 'ether')
}

export const fromWei = (web3, weiValue) => {
	return web3.utils.fromWei(weiValue, 'ether')
}
