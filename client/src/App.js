import React, { useState, useEffect } from 'react'
import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from './getWeb3'

import './App.css'

const App = () => {
	const [storageValue, setStorageValue] = useState(0)
	const [web3, setWeb3] = useState(undefined)
	const [accounts, setAccounts] = useState([])
	const [contract, setContract] = useState([])

	const [val, setVal] = useState('')

	useEffect(() => {
		const inti = async () => {
			try {
				// Get network provider and web3 instance.
				const web3 = await getWeb3()

				// Use web3 to get the user's accounts.
				const accounts = await web3.eth.getAccounts()

				// Get the contract instance.
				const networkId = await web3.eth.net.getId()
				const deployedNetwork =
					SimpleStorageContract.networks[networkId]
				const instance = new web3.eth.Contract(
					SimpleStorageContract.abi,
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
		const loadValue = async () => {
			// Stores a given value, 5 by default.
			// await contract.methods.set(15).send({ from: accounts[0] })

			// Get the value from the contract to prove it worked.
			const response = await contract.methods.get().call()

			// Update state with the result.
			setStorageValue(response)
		}
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			loadValue()
		}
	}, [web3, accounts, contract])

	// Get Value
	const getValue = async () => {
		if (typeof web3 !== 'undefined' && contract.length !== 0) {
			const response = await contract.methods.get().call()
			return response
		} else {
			return null
		}
	}

	// Set Value
	const setValue = async val => {
		if (typeof web3 !== 'undefined' && contract.length !== 0) {
			await contract.methods.set(val).send({ from: accounts[0] })
		} else {
			alert('Cannot set the value')
		}
	}

	// handle Change
	const handelChange = e => {
		setVal(e.target.value)
	}

	const handelSubmit = async e => {
		e.preventDefault()
		await setValue(val)
		const response = await getValue()
		setStorageValue(response)
	}

	if (!web3) {
		return <div>Loading Web3, accounts, and contract...</div>
	}
	return (
		<div className='App'>
			<h1>Welcome to dfund application</h1>
			<p>This is test demo.</p>
			<div>The stored value is: {storageValue}</div>

			<form onSubmit={handelSubmit}>
				<input
					type='number'
					value={val}
					onChange={handelChange}
					placeholder='Enter the value'
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default App
