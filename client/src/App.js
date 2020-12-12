import React, { useState, useEffect } from 'react'
import CampaignFactory from './contracts/DfundFactory.json'
import getWeb3 from './getWeb3'

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

			// const campaigns = new web3.eth.Contract(
			// 	CampaignFactory,
			// 	contract._address
			// )
			// console.log('campaigns', contract._jsonInterface)
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
			<p>This is test demo.</p>
		</div>
	)
}

export default App
