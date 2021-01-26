import React, { useContext, useEffect, useState } from 'react'
import { Alert, Card, Form, InputNumber, Button } from 'antd'
import { useQuery, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { PlusCircleFilled, LikeFilled, HeartFilled } from '@ant-design/icons'

import FactoryContext from '../context/factory/factoryContext'
import {
	getCampaignDetails,
	fromWeiToEther,
	fundAmount,
	// getContributions,
	// getCampaignSpendingRequests,
} from '../api/web3Api'

const CampaignDetails = () => {
	const { campaign } = useParams()
	// console.log(campaign)

	const { web3, accounts, contract } = useContext(FactoryContext)

	const [balance, setBalance] = useState(0)

	useEffect(() => {
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			// setBalance(web3.eth.getBalance(campaign))
			// console.log(web3.utils.isAddress('campaign'))
		}
	}, [web3, accounts, contract])

	useEffect(() => {
		if (
			typeof web3 !== 'undefined' &&
			contract.length !== 0 &&
			accounts.length !== 0
		) {
			// setBalance(web3.eth.getBalance(campaign))
			// console.log(web3.utils.isAddress('campaign'))
			web3.eth
				.getBalance(campaign)
				.then(data => setBalance(data))
				.catch(err => console.log(err))
		}
	}, [web3, accounts, contract, campaign])

	const { data, isError, error, isLoading } = useQuery(
		['campaign'],
		() => getCampaignDetails(web3, campaign),
		{ enabled: typeof web3 !== 'undefined' }
	)
	// const contribution = useQuery(
	// 	['contribution_count'],
	// 	() => getContributions(web3, campaign),
	// 	{ enabled: typeof web3 !== 'undefined' }
	// )
	// console.log('contribution', contribution)
	// const spendingRequests = useQuery(
	// 	['requests'],
	// 	() => getCampaignSpendingRequests(web3, campaign),
	// 	{ enabled: typeof web3 !== 'undefined' }
	// )
	// console.log('requests', spendingRequests)

	const fund = useMutation(
		amount => {
			return fundAmount(web3, campaign, amount, accounts[0])
		},
		{
			onSuccess: data => {
				console.log('success', data)
			},
		}
	)

	const onFinish = values => {
		console.log('Success:', values)
		fund.mutate(values.amount)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}
	// if (isLoading) return <Spin />
	if (isError) return <Alert message={error} type='error' />

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				marginTop: '2rem',
			}}
		>
			<Link to={`/campaign/${campaign}/requests`}>
				<Button type='primary'>View request</Button>
			</Link>

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
				<p>
					Goal:{' '}
					{data
						? fromWeiToEther(web3, data.goalAmount.toString())
						: ''}{' '}
					ETH
				</p>
				<p>
					Minimum Contrubution:{' '}
					{data
						? fromWeiToEther(
								web3,
								data.minimumContrubution.toString()
						  )
						: ''}{' '}
					ETH
				</p>
				<p>Deadline: {data ? data.deadline : ''}</p>
				<p>Country: {data ? data.country : ''}</p>
				<p>Category{data ? data.category : ''}</p>
				<p>
					Status: {data ? (data.active ? 'active' : 'inactive') : ''}
				</p>
				<p>Image: {data ? data.imageHash : ''}</p>
				<p>
					{balance !== 0 &&
						`Balance: ${fromWeiToEther(web3, balance)} ETH`}
				</p>
			</Card>

			<Form
				name='basic'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ width: '20rem', marginTop: '1rem' }}
			>
				<Form.Item
					label='Amount'
					name='amount'
					rules={[
						{
							required: true,
							message: 'Please input amount!',
						},
					]}
				>
					<InputNumber min={0.00001} style={{ width: '100%' }} />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					Fund
				</Button>
			</Form>
		</div>
	)
}

export default CampaignDetails
