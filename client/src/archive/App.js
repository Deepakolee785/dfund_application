import React, { useState, useEffect } from 'react'
import CampaignFactory from '../contracts/DfundFactory.json'
import getWeb3 from '../getWeb3'

import './App.css'

const App = () => {
	const [web3, setWeb3] = useState(undefined)
	const [accounts, setAccounts] = useState([])
	const [contract, setContract] = useState([])

	useEffect(() => {
		const inti = async () => {
			try {
				// Get network provider and web3 instance.
				const web3 = await getWeb3()

				// Use web3 to get the user's accounts.
				const accounts = await web3.eth.getAccounts()

				// Get the contract instance.
				const networkId = await web3.eth.net.getId()
				const deployedNetwork = CampaignFactory.networks[networkId]
				const instance = new web3.eth.Contract(
					CampaignFactory.abi,
					deployedNetwork && deployedNetwork.address
				)

				// Set web3, accounts, and contract to the state, and then proceed with an
				// example of interacting with the contract's methods.
				setWeb3(web3)
				setAccounts(accounts)
				setContract(instance)
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				)
				console.error(error)
			}
		}
		inti()
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			console.log('web3', web3)
			console.log('accounts', accounts)
			console.log('contract', contract)

			// const temp = {
			// 	title: 'Test 1',
			// 	desc: 'Test description',
			// 	category: 'Technology',
			// 	country: 'Nepal',
			// 	goal: 10000,
			// 	min: 100,
			// 	deadline: 1231233,
			// 	imageHash: 'hashhashtest',
			// }

			// contract.methods
			// 	.createCampaign(
			// 		temp.title,
			// 		temp.desc,
			// 		temp.category,
			// 		temp.country,
			// 		temp.goal,
			// 		temp.min,
			// 		temp.deadline,
			// 		temp.imageHash
			// 	)
			// 	.send({
			// 		from: accounts[0],
			// 	})
			// 	.then(result => console.log('created', result))
			// 	.catch(err => console.log('not created', err))

			contract.methods
				.getDeployedCampaigns()
				.call()
				.then(data => console.log('campaigns', data))
			// console.log()
		}
	}, [web3, accounts, contract])

	if (!web3) {
		return <div>Loading Web3, accounts, and contract...</div>
	}
	return (
		<div className='App'>
			<h1>Welcome to dfund application</h1>
			<p>
				<strong>Address: </strong>
				{contract._address}
			</p>
		</div>
	)
}

export default App

// const info = useQuery('campaigns', () => {
// 	return contract.methods
// 		.getDeployedCampaigns()
// 		.call()
// 		.then(response => {
// 			return response
// 		})
// })

// console.log(info)

// useEffect(() => {
// 	if (
// typeof web3 !== 'undefined' &&
// contract.length !== 0 &&
// accounts.length !== 0
// 	) {
// 		// const temp = {
// 		// 	title: 'Test 2',
// 		// 	desc: 'Test description 2',
// 		// 	category: 'Tech',
// 		// 	country: 'China',
// 		// 	goal: 10000000000,
// 		// 	min: 10000,
// 		// 	deadline: 12231233,
// 		// 	imageHash: 'hash1',
// 		// }

// 		// contract.methods
// 		// 	.createCampaign(
// 		// 		temp.title,
// 		// 		temp.desc,
// 		// 		temp.category,
// 		// 		temp.country,
// 		// 		temp.goal,
// 		// 		temp.min,
// 		// 		temp.deadline,
// 		// 		temp.imageHash
// 		// 	)
// 		// 	.send({
// 		// 		from: accounts[0],
// 		// 	})
// 		// 	.then(result => console.log('created', result))
// 		// 	.catch(err => console.log('not created', err))

// 		contract.methods
// 			.getDeployedCampaigns()
// 			.call()
// 			.then(response => {
// 				console.log('Deployed Campaign Address', response)
// 				setDeployedContract(response)
// 			})
// 			.catch(err => {
// 				console.log('Fetch campaign error', err)
// 			})
// 		getCampaigns()
// 	}
// }, [web3, accounts, contract])

// const getCampaigns = () => {
// 	contract.methods
// 		.getDeployedCampaigns()
// 		.call()
// 		.then(response => {
// 			console.log('Deployed Campaign Address', response)
// 			setDeployedContract(response)
// 		})
// 		.catch(err => {
// 			console.log('Fetch campaign error', err)
// 		})
// }

// useEffect(() => {
// 	if (deployedContract.length !== 0) {
// 		const allCampaigns = deployedContract.map((Contract, index) => {
// 			const myCampaign = new web3.eth.Contract(
// 				DfundContract.abi,
// 				Contract
// 			)
// 			return myCampaign
// 		})
// 		setDeployedCampaigns(allCampaigns)
// 	}
// 	// eslint-disable-next-line
// }, [deployedContract])

// useEffect(() => {
// 	if (deployedCampaigns.length !== 0) {
// 		// eslint-disable-next-line
// 		deployedCampaigns.forEach((campaign, index) => {
// 			campaign.methods
// 				.campaign()
// 				.call()
// 				.then(data => {
// 					console.log(data)
// 					setDetails(prev => [...prev, data])
// 					console.log(details)
// 				})
// 				.catch(err => console.error(err))
// 		})
// 	}
// 	// eslint-disable-next-line
// }, [deployedCampaigns])

// console.log('details', details)

// Create a client
