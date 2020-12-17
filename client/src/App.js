import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FactoryContext from './context/factory/factoryContext'
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import CampaignFactory from './components/CampaignFactory'
import CampaignDetails from './components/CampaignDetails'
import { Card } from 'antd'

const App = () => {
	const { web3, accounts, contract, initilizeWeb3 } = useContext(
		FactoryContext
	)
	useEffect(() => {
		initilizeWeb3()
		// eslint-disable-next-line
	}, [])

	// useEffect(() => {
	// 	if (
	// 		typeof web3 !== 'undefined' &&
	// 		contract.length !== 0 &&
	// 		accounts.length !== 0
	// 	) {
	// 		const temp = {
	// 			title: 'Test 2',
	// 			desc: 'Test description 2',
	// 			category: 'Tech',
	// 			country: 'China',
	// 			goal: 10000000000,
	// 			min: 10000,
	// 			deadline: 12231233,
	// 			imageHash: 'hash1',
	// 		}
	// 		contract.methods
	// 			.createCampaign(
	// 				temp.title,
	// 				temp.desc,
	// 				temp.category,
	// 				temp.country,
	// 				temp.goal,
	// 				temp.min,
	// 				temp.deadline,
	// 				temp.imageHash
	// 			)
	// 			.send({
	// 				from: accounts[0],
	// 			})
	// 			.then(result => console.log('created', result))
	// 			.catch(err => console.log('not created', err))
	// 	}
	// }, [web3, accounts, contract])

	return (
		<Router>
			<div className='App'>
				<Card style={{ border: '1px solid #ccc' }}>
					<h1>Dfund Application</h1>
					<p>
						<strong>Account: </strong>
						{accounts[0]}
					</p>
					<p>
						<strong>Address: </strong>
						{contract._address}
					</p>
				</Card>
				<hr />

				<Switch>
					<Route exact path='/' component={CampaignFactory} />
					<Route
						exact
						path='/campaign/:campaign'
						component={CampaignDetails}
					/>
				</Switch>

				<ReactQueryDevtools initialIsOpen={false} />
			</div>
		</Router>
	)
}

export default App
