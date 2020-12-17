import React, { useContext, useEffect, useState } from 'react'
import { Alert, Card, Spin } from 'antd'
import { useQuery } from 'react-query'
import { useParams, Redirect } from 'react-router-dom'
import { PlusCircleFilled, LikeFilled, HeartFilled } from '@ant-design/icons'

import FactoryContext from '../context/factory/factoryContext'
import { getCampaignDetails, fromWei } from '../api/web3Api'

const CampaignDetails = () => {
	const { campaign } = useParams()

	const { web3, accounts, contract } = useContext(FactoryContext)

	const [balance, setBalance] = useState(0)

	useEffect(() => {
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			// setBalance(web3.eth.getBalance(campaign))
			console.log(web3.utils.isAddress('campaign'))
		}
	}, [web3, accounts, contract])

	useEffect(() => {
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			// setBalance(web3.eth.getBalance(campaign))
			console.log(web3.utils.isAddress('campaign'))
			web3.eth
				.getBalance(campaign)
				.then(data => setBalance(data))
				.catch(err => console.log(err))
		}
	}, [web3, accounts, contract])

	const { data, isError, error, isLoading } = useQuery(
		['campaign'],
		() => getCampaignDetails(web3, campaign),
		{ enabled: typeof web3 !== 'undefined' }
	)

	// if (isLoading) return <Spin />
	if (isError) return <Alert message={error} type='error' />

	return (
		<div>
			{/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}

			<Card
				title={data ? data.title : ''}
				hoverable
				loading={isLoading}
				bordered
				headStyle={{ background: '#eee' }}
				style={{ width: 480 }}
				actions={[
					<PlusCircleFilled key='add' />,
					<HeartFilled key='edit' />,
					<LikeFilled key='ellipsis' />,
				]}
			>
				<p>Description: {data ? data.description : ''}</p>
				<p>creator: {data ? data.creator : ''}</p>
				<p>Goal: {data ? fromWei(web3, data.goalAmount) : ''} ETH</p>
				<p>
					Minimum Contrubution:{' '}
					{data ? fromWei(web3, data.minimumContrubution) : ''} ETH
				</p>
				<p>Deadline: {data ? data.deadline : ''}</p>
				<p>Country: {data ? data.country : ''}</p>
				<p>Category{data ? data.category : ''}</p>
				<p>
					Status: {data ? (data.active ? 'active' : 'inactive') : ''}
				</p>
				<p>Image: {data ? data.imageHash : ''}</p>
				<p>{balance !== 0 && `Balance: ${balance}`}</p>
			</Card>
		</div>
	)
}

export default CampaignDetails
