import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { DEV_URL, IPFS_INFURA_URL } from '../../../config'
import { Image, Table } from 'antd'
import { getRequests } from '../../../api/request'
import { Button } from '../../../components/button'
import { getTransactions } from '../../../api/transaction'
import { v4 as uuid } from 'uuid'

const Campaings = () => {
	const [showRequest, setShowRequests] = useState(false)
	const [campaigns, setCampaigns] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		axios
			.get(`${DEV_URL}/api/campaign/get-campaigns`)
			.then(res => {
				// console.log(res.data)
				setCampaigns(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => setLoading(false))
	}, [])

	const columns = [
		{
			title: 'Image',
			dataIndex: 'imageHash',
			key: 'imageHash',
			render: imageHash => {
				return (
					<Image
						width={50}
						height={50}
						src={`${IPFS_INFURA_URL}/${imageHash}`}
						fallback='data:image/png;base64,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'
					/>
				)
			},
		},
		{
			title: 'Address',
			dataIndex: 'addr',
			key: 'addr',
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Creator',
			dataIndex: 'creator',
			key: 'creator',
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Deadline',
			dataIndex: 'deadline',
			key: 'deadline',
		},
		{
			title: 'Goal Amount',
			dataIndex: 'goalAmount',
			key: 'goalAmount',
		},
		{
			title: 'Minimum Contribution',
			dataIndex: 'minimumContribution',
			key: 'minimumContribution',
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Block Hash',
			dataIndex: 'blockHash',
			key: 'blockHash',
		},
		{
			title: 'Block Number',
			dataIndex: 'blockNumber',
			key: 'blockNumber',
		},
		{
			title: 'Gas Used',
			dataIndex: 'cumulativeGasUsed',
			key: 'cumulativeGasUsed',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
		},
		{
			title: 'Transaction Hash',
			dataIndex: 'transactionHash',
			key: 'transactionHash',
		},
	]

	const dataSource = campaigns.map(campaign => {
		const {
			_id: id,
			blockHash,
			blockNumber,
			cumulativeGasUsed,
			type,
			addr,
			category,
			country,
			creator,
			deadline,
			description,
			goalAmount,
			imageHash,
			minimumContribution,
			title,
			status,
			to,
			transactionHash,
		} = campaign

		return {
			key: id,
			blockHash,
			blockNumber,
			cumulativeGasUsed,
			type,
			addr,
			category,
			country,
			creator,
			deadline,
			description,
			goalAmount,
			imageHash,
			minimumContribution,
			title,
			status,
			to,
			transactionHash,
		}
	})
	const [currentCampaign, setCurrentCampaign] = useState(null)
	const [currentCampaignAddress, setCurrentCampaignAddress] = useState(null)

	const [requestData, setRequestData] = useState(null)
	const [transactionData, setTransactionData] = useState(null)
	useEffect(() => {
		if (currentCampaign && showRequest) {
			getRequests(currentCampaign)
				.then(res => {
					// console.log(res)
					setRequestData(res.data)
				})
				.catch(err => {
					console.log(err)
				})
			// console.log(currentCampaign)
		}
	}, [currentCampaign, showRequest])
	useEffect(() => {
		if (currentCampaignAddress && showRequest) {
			getTransactions(currentCampaignAddress)
				.then(res => {
					// console.log(res.data)
					setTransactionData(res.data)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [currentCampaignAddress, showRequest])
	const TransactionColumns = [
		{
			title: 'Sender',
			dataIndex: 'sender',
			key: 'sender',
		},
		{
			title: 'Reciver',
			dataIndex: 'reciver',
			key: 'reciver',
		},
		{
			title: 'Campaign',
			dataIndex: 'projectAddress',
			key: 'projectAddress',
		},
		{
			title: 'Transaction Type',
			dataIndex: 'transactionType',
			key: 'transactionType',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Block Hash',
			dataIndex: 'blockHash',
			key: 'blockHash',
		},
		{
			title: 'Block Number',
			dataIndex: 'blockNumber',
			key: 'blockNumber',
		},
		{
			title: 'Gas Used',
			dataIndex: 'cumulativeGasUsed',
			key: 'cumulativeGasUsed',
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Transaction Hash',
			dataIndex: 'transactionHash',
			key: 'transactionHash',
		},
	]

	const RequestColumns = [
		// {
		// 	title: 'campaign',
		// 	dataIndex: 'campaign',
		// 	key: 'campaign',
		// },
		{
			title: 'description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'maker',
			dataIndex: 'maker',
			key: 'maker',
		},
		{
			title: 'recipient',
			dataIndex: 'recipient',
			key: 'recipient',
		},
		{
			title: 'Amount(ETH)',
			dataIndex: 'value',
			key: 'value',
		},
		{
			title: 'Complete',
			dataIndex: 'complete',
			key: 'complete',
		},
		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Block Hash',
			dataIndex: 'blockHash',
			key: 'blockHash',
		},
		{
			title: 'Block Number',
			dataIndex: 'blockNumber',
			key: 'blockNumber',
		},
		{
			title: 'Gas Used',
			dataIndex: 'cumulativeGasUsed',
			key: 'cumulativeGasUsed',
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Transaction Hash',
			dataIndex: 'transactionHash',
			key: 'transactionHash',
		},
	]

	const RequestDataSource =
		requestData &&
		requestData.campaignRequests.map(request => {
			// ​campaign,​description,​maker,​recipient,​value,​blockHash,​blockNumber,​cumulativeGasUsed,​status,to,transactionHash,complete,createdAt
			const {
				// campaign,
				description,
				maker,
				recipient,
				value,
				blockHash,
				blockNumber,
				cumulativeGasUsed,
				status,
				transactionHash,
				complete,
				createdAt,
			} = request
			return {
				key: uuid(),
				// campaign,
				description,
				maker,
				recipient,
				value,
				blockHash,
				blockNumber,
				cumulativeGasUsed,
				status,
				transactionHash,
				complete: complete.toString(),
				createdAt,
			}
		})
	const TransactionDataSource =
		transactionData &&
		transactionData.campaignTransactions.map(transaction => {
			const {
				user,
				sender,
				amount,
				reciver,
				blockHash,
				blockNumber,
				cumulativeGasUsed,
				status,
				transactionHash,
				projectAddress,
				transactionType,
				createdAt,
			} = transaction
			return {
				key: uuid(),
				user,
				sender,
				amount,
				reciver,
				blockHash,
				blockNumber,
				cumulativeGasUsed,
				status,
				transactionHash,
				projectAddress,
				transactionType,
				createdAt,
			}
		})
	if (showRequest)
		return (
			<div>
				<Button
					variant='primary'
					type='primary'
					onClick={() => setShowRequests(false)}
					style={{ background: 'red' }}
				>
					Back
				</Button>
				<h3>Requests</h3>
				<Table
					dataSource={RequestDataSource}
					columns={RequestColumns}
					scroll={{ x: true }}
				/>
				{/* <pre>
					{requestData
						? JSON.stringify(requestData, null, 6)
						: 'no requests'}
				</pre> */}
				<h3>Transactions</h3>
				<Table
					scroll={{ x: true }}
					dataSource={TransactionDataSource}
					columns={TransactionColumns}
				/>
				{/* <pre>
					{transactionData
						? JSON.stringify(transactionData, null, 6)
						: 'no transaction'}
				</pre> */}
			</div>
		)
	return (
		<div>
			<h3>Campaigns</h3>
			<Table
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: true }}
				loading={loading}
				onRow={(record, rowIndex) => {
					return {
						// onClick: event => {}, // click row
						onDoubleClick: event => {
							setShowRequests(true)
							setCurrentCampaign(record.key)
							setCurrentCampaignAddress(record.addr)
						}, // double click row
					}
				}}
			/>
		</div>
	)
}

export default Campaings
