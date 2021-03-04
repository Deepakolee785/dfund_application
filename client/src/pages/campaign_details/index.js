import React, { useContext, useEffect, useState } from 'react'
import {
	Alert,
	Card,
	Form,
	InputNumber,
	Button,
	Table,
	Divider,
	Image,
	Tag,
	message,
} from 'antd'
import { useQuery, useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
// import { PlusCircleFilled, LikeFilled, HeartFilled } from '@ant-design/icons'
import Layout from '../../layout/user_layout'

import FactoryContext from '../../context/factory/factoryContext'
import AuthContext from '../../context/auth/authContext'
import {
	getCampaignDetails,
	fromWeiToEther,
	fromEtherToWei,
	fundAmount,
	getContributionsCount,
	getContributions,
} from '../../api/web3Api'
import { IPFS_INFURA_URL } from '../../config'
import { saveTransaction } from '../../api/transaction'

const CampaignDetails = () => {
	const { campaign } = useParams()
	// console.log(campaign)

	const { web3, accounts, contract } = useContext(FactoryContext)
	const { isAuthenticated, user } = useContext(AuthContext)
	// console.log(user)
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

	const contributions = useQuery(
		['contribution'],
		() => getContributions(web3, campaign, contributionCount.data),
		{
			enabled: isReady && !!contributionCount.data,
		}
	)

	const fund = useMutation(
		amount => {
			return fundAmount(web3, campaign, amount, accounts[0])
		},
		{
			onSuccess: data => {
				// console.log('success', data)
				const {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
					events: {
						LogContributionSent: {
							returnValues: {
								amount,
								contributor,
								projectAddress,
							},
						},
					},
				} = data

				const myData = {
					user: user._id,
					sender: contributor,
					amount: fromWeiToEther(web3, amount),
					reciver: to,
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					transactionHash,
					projectAddress,
					transactionType: 'contribution',
				}
				// console.log(myData)
				saveTransaction(myData)
					.then(res => {
						message.success(res.data.message)
					})
					.catch(err => {
						message.error('Error in saving transaction in DB!')
					})
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
			web3.eth
				.getBalance(campaign)
				.then(data => setBalance(data))
				.catch(err => console.log(err))
		}
	}, [web3, accounts, contract, campaign, fund])

	const onFinish = values => {
		// console.log('Success:', values)
		fund.mutate(fromEtherToWei(web3, values.amount.toString()))
	}

	// Contribution table list
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
		<Layout>
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
					<Image
						// width={200}
						height={210}
						src={`${IPFS_INFURA_URL}/${data ? data.imageHash : ''}`}
						fallback='data:image/png;base64,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'
					/>
					<p>Description: {data ? data.description : ''}</p>
					<p>creator: {data ? data.creator : ''}</p>
					<p>
						Goal:{' '}
						{data ? fromWeiToEther(web3, data.goalAmount) : ''} ETH
					</p>
					<p>
						Minimum Contrubution:{' '}
						{data
							? fromWeiToEther(web3, data.minimumContrubution)
							: ''}{' '}
						ETH
					</p>
					<p>Deadline: {data ? data.deadline : ''}</p>
					<p>Country: {data ? data.country : ''}</p>
					<p>Category{data ? data.category : ''}</p>
					<p>
						Status:{' '}
						{data ? (data.active ? 'active' : 'inactive') : ''}
					</p>
					<p>Image: {data ? data.imageHash : ''}</p>
					<p>
						{balance !== 0 &&
							`Balance: ${fromWeiToEther(web3, balance)} ETH`}
					</p>
				</Card>
				<Divider style={{ backgroundColor: '#ccc' }} />
				<h2 style={{}}>Contribute to this campaing from here!</h2>
				{isAuthenticated ? (
					<Form
						name='fundInCampaign'
						onFinish={onFinish}
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
				) : (
					<Tag color='red'>Login to contribute to this campaign</Tag>
				)}
				<Divider style={{ backgroundColor: '#ccc' }} />
				<h2>Contributors of this campaigns!!</h2>
				<Table columns={columns} dataSource={dataSource} />
			</div>
		</Layout>
	)
}

export default CampaignDetails
