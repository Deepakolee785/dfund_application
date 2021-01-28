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

export const createCampaign = (contract, data, account) => {
	return contract.methods
		.createCampaign(
			data.title,
			data.description,
			data.category,
			data.country,
			data.goalAmount,
			data.minContribution,
			data.deadline,
			data.imagehash
		)
		.send({
			from: account,
		})
		.then(result => {
			// console.log('created', result)
			return result
		})
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
export const getApproversCount = (web3, campaign) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.approversCount()
		.call()
		.then(res => {
			return res
		})
}
export const approveRequest = (web3, campaign, requestId, account) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.approveRequest(requestId)
		.send({
			from: account,
		})
		.then(res => {
			return res
		})
}
export const finilizeRequest = (web3, campaign, requestId, account) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)
	return myCampaign.methods
		.finializeRequest(requestId)
		.send({
			from: account,
		})
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
export const getContributions = (web3, campaign, count) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)

	return Promise.all(
		Array(parseInt(count))
			.fill()
			.map((element, index) => {
				// console.log('called')
				return myCampaign.methods
					.contributions(index + 1)
					.call()
					.then(res => res)
			})
	)
}
export const getCampaignSpendingRequests = (web3, campaign, data, account) => {
	let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)

	return myCampaign.methods
		.createRequest(data.description, data.value, data.recipient)
		.send({
			from: account,
		})
		.then(result => {
			return result
		})
}
export const createCampaignSpendingRequest = (web3, campaign) => {
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
