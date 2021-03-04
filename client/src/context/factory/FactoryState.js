import React, { useReducer } from 'react'
import FactoryContext from './factoryContext'
import factoryReducer from './factoryReducer'
import { notification } from 'antd'

import getWeb3 from '../../getWeb3'
import CampaignFactory from '../../contracts/DfundFactory.json'

const FactoryState = props => {
	const initialState = {
		web3: undefined,
		accounts: [],
		contract: [],
		error: null,
	}

	const [state, dispatch] = useReducer(factoryReducer, initialState)

	const initilizeWeb3 = async () => {
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

			dispatch({
				type: 'GET_WEB3',
				payload: web3,
			})
			dispatch({
				type: 'GET_ACCOUNTS',
				payload: accounts,
			})
			dispatch({
				type: 'GET_FACTORY_INSTANCE',
				payload: instance,
			})
		} catch (error) {
			// Catch any errors for any of the above operations.
			// alert(
			// 	`Failed to load web3, accounts, or contract. Check console for details.`
			// )
			notification.error({
				message: `Network Error`,
				description:
					'Failed to load web3, accounts, or contract. Check console for details.',
				duration: 20,
			})

			console.error(error)

			dispatch({
				type: 'GET_WEB3_ERROR',
				payload: error,
			})
		}
	}

	const setLatestAccount = accounts => {
		dispatch({
			type: 'GET_ACCOUNTS',
			payload: accounts,
		})
	}
	return (
		<FactoryContext.Provider
			value={{
				web3: state.web3,
				accounts: state.accounts,
				contract: state.contract,
				error: state.error,
				initilizeWeb3,
				setLatestAccount,
			}}
		>
			{props.children}
		</FactoryContext.Provider>
	)
}

export default FactoryState
