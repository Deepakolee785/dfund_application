import React, { useContext, useEffect } from 'react'
import { Button, Table, Tag } from 'antd'
import { Link, useParams } from 'react-router-dom'
import FactoryContext from '../../context/factory/factoryContext'
import Layout from '../../layout/user_layout'

import {
	getRequestsCount,
	fromWeiToEther,
	getApproversCount,
	approveRequest,
	finilizeRequest,
} from '../../api/web3Api'
import DfundContract from '../../contracts/Dfund.json'

import { useQuery, useMutation } from 'react-query'
const ViewRequestPage = () => {
	// const history = useHistory()
	const { web3, accounts, contract } = useContext(FactoryContext)

	const { campaign } = useParams()

	const isReady =
		typeof web3 !== 'undefined' &&
		contract.length !== 0 &&
		accounts.length !== 0

	const approveCampaignRequest = useMutation(
		data => approveRequest(web3, campaign, data, accounts[0]),
		{
			onSuccess: () => {
				// history.push('/')
			},
		}
	)
	const finilizeCampaignRequest = useMutation(
		data => finilizeRequest(web3, campaign, data, accounts[0]),
		{
			onSuccess: data => {
				// history.push('/')
				console.log('finilized:', data)
			},
		}
	)
	const requestCount = useQuery(
		['campaign_requests'],
		() => getRequestsCount(web3, campaign),
		{
			enabled: isReady,
		}
	)
	const approversCount = useQuery(
		['approvers_count'],
		() => getApproversCount(web3, campaign),
		{
			enabled: isReady,
		}
	)

	// console.log(requestCount.data)

	const requests = useQuery(
		['requests'],
		() => {
			let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)

			return Promise.all(
				Array(parseInt(requestCount.data))
					.fill()
					.map((element, index) => {
						// console.log('called')
						return myCampaign.methods
							.requests(index)
							.call()
							.then(res => res)
					})
			)
		},
		{
			enabled: isReady && !!requestCount.data,
		}
	)

	useEffect(() => {
		if (requestCount.data) {
			requests.refetch()
		}
		// eslint-disable-next-line
	}, [requestCount.data])

	const onApproveRequest = requestId => {
		if (requestId || requestId === 0) {
			// console.log(requestId)
			approveCampaignRequest.mutate(requestId)
		}
	}
	const onFinilizeRequest = requestId => {
		// console.log(requestId)
		if (requestId || requestId === 0) {
			finilizeCampaignRequest.mutate(requestId)
		}
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Description',
			dataIndex: 'desc',
			key: 'desc',
		},
		{
			title: 'Amount(ETH)',
			dataIndex: 'amt',
			key: 'amt',
		},
		{
			title: 'Recipient',
			dataIndex: 'recipient',
			key: 'recipient',
		},
		{
			title: 'Approval Count',
			dataIndex: 'approval',
			key: 'approval',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: ({ index, item }) => {
				const isCompleted = item.complete
				const isReadyToFinilize =
					parseInt(item.approvalCount) >
					parseInt(approversCount.data) / 2
				if (isCompleted) return <Tag color={'green'}>Finilized</Tag>
				return (
					<div>
						<Button
							type='primary'
							onClick={() => {
								// console.log(index)
								onApproveRequest(index)
							}}
							loading={approveCampaignRequest.isLoading}
							disabled={isCompleted}
						>
							Approve
						</Button>
						<Button
							type='primary'
							danger
							// disabled
							onClick={() => {
								// console.log(index)
								onFinilizeRequest(index)
							}}
							loading={finilizeCampaignRequest.isLoading}
							disabled={isCompleted || !isReadyToFinilize}
						>
							Finilize
						</Button>
					</div>
				)
			},
		},
	]

	const dataSource =
		requests.isSuccess &&
		requests.data.length > 0 &&
		requests.data.map((item, index) => {
			return {
				key: index,
				id: index + 1,
				desc: item.description,
				amt: fromWeiToEther(web3, item.value),
				recipient: item.recipient,
				complete: item.complete,
				approval: `${item.approvalCount}/${approversCount.data}`,
				action: { index, item },
			}
		})

	return (
		<Layout>
			<div
				className='Center'
				style={{
					minHeight: '60vh',
				}}
			>
				<h1> Campaign Requests Details</h1>
				<br />
				<Link
					to={`/campaign/${campaign}/requests/new`}
					style={{ marginBottom: '2rem' }}
				>
					<Button type='primary'>Create Request</Button>
				</Link>
				<br />
				<Table
					rowClassName={(record, index) => {
						// console.log(record)
						return record.complete ? 'table-row-complete' : ''
					}}
					columns={columns}
					dataSource={dataSource}
					loading={requests.isLoading}
				/>
				<p>{requestCount.data} requests found.</p>
			</div>
		</Layout>
	)
}

export default ViewRequestPage
