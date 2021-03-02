import React, { useContext, useEffect, useState } from 'react'
import { Alert, Card, Form, InputNumber, Button, Table, Divider } from 'antd'
import { useQuery, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
// import { PlusCircleFilled, LikeFilled, HeartFilled } from '@ant-design/icons'

import FactoryContext from '../context/factory/factoryContext'
import DfundContract from '../contracts/Dfund.json'
import {
	getCampaignDetails,
	fromWeiToEther,
	fromEtherToWei,
	fundAmount,
	getContributionsCount,
	// getCampaignSpendingRequests,
} from '../api/web3Api'

const CampaignDetails = () => {
	const { campaign } = useParams()
	// console.log(campaign)

	const { web3, accounts, contract } = useContext(FactoryContext)

	const [balance, setBalance] = useState(0)

	const isReady =
		typeof web3 !== 'undefined' &&
		contract.length !== 0 &&
		accounts.length !== 0

	const { data, isError, error, isLoading } = useQuery(
		['campaign'],
		() => getCampaignDetails(web3, campaign),
		{ enabled: typeof web3 !== 'undefined' }
	)
	const contributionCount = useQuery(
		['contribution_count'],
		() => getContributionsCount(web3, campaign),
		{ enabled: typeof web3 !== 'undefined' }
	)
	console.log('contribution', contributionCount.data)

	const contributions = useQuery(
		['contribution'],
		() => {
			let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)

			return Promise.all(
				Array(parseInt(contributionCount.data))
					.fill()
					.map((element, index) => {
						console.log('called')
						return myCampaign.methods
							.contributions(index + 1)
							.call()
							.then(res => res)
					})
			)
		},
		{
			enabled: isReady && !!contributionCount.data,
		}
	)

	console.log(contributions)

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

	// useEffect(() => {
	// 	contributions.refetch()
	// 	// eslint-disable-next-line
	// }, [contributionCount.data])

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
	}, [web3, accounts, contract, campaign, fund])

	const onFinish = values => {
		console.log('Success:', values)
		fund.mutate(fromEtherToWei(web3, values.amount.toString()))
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const columns = [
		{
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
		},
		{
			title: 'Contributor',
			dataIndex: 'contributor',
			key: 'contributor',
		},
		{
			title: 'Amount(ETH)',
			dataIndex: 'amt',
			key: 'amt',
		},
	]

	const dataSource =
		contributions.isSuccess &&
		contributions.data.length > 0 &&
		contributions.data.map((item, index) => {
			return {
				key: index,
				sn: index + 1,
				contributor: item.contributor,
				amt: fromWeiToEther(web3, item.amount),
			}
		})

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
			<h1>Campaign Details</h1>
			<br />
			<Link
				to={`/campaign/${campaign}/requests`}
				style={{ marginBottom: '2rem' }}
			>
				<Button type='primary'>View all requests</Button>
			</Link>

			{/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}

			<Card
				title={data ? data.title : ''}
				hoverable
				loading={isLoading}
				bordered
				headStyle={{ background: '#eee' }}
				style={{ width: 480 }}
				// actions={[
				// 	<PlusCircleFilled key='add' />,
				// 	<HeartFilled key='edit' />,
				// 	<LikeFilled key='ellipsis' />,
				// ]}
			>
				<p>Description: {data ? data.description : ''}</p>
				<p>creator: {data ? data.creator : ''}</p>
				<p>
					Goal: {data ? fromWeiToEther(web3, data.goalAmount) : ''}{' '}
					ETH
				</p>
				<p>
					Minimum Contrubution:{' '}
					{data ? fromWeiToEther(web3, data.minimumContrubution) : ''}{' '}
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
			<Divider style={{ backgroundColor: '#ccc' }} />
			<h2 style={{}}>Contribute to this campaing from here!</h2>
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
					<InputNumber
						min={0.00001}
						style={{ width: '100%' }}
						placeholder='amount in Eth'
					/>
				</Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					loading={fund.isLoading}
					block
				>
					Fund
				</Button>
			</Form>
			<Divider style={{ backgroundColor: '#ccc' }} />
			<h2>Contributors of this campaigns!!</h2>
			<Table columns={columns} dataSource={dataSource} />
		</div>
	)
}

export default CampaignDetails
