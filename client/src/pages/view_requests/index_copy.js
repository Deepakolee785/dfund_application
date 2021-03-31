import React, { useContext, useEffect, useState } from 'react'
import { message, Table, Tag, Modal } from 'antd'
import {
	// Link,
	useParams,
} from 'react-router-dom'
import FactoryContext from '../../context/factory/factoryContext'
import AuthContext from '../../context/auth/authContext'
// import Layout from '../../layout/user_layout'

import CreateRequestPage from '../create_request/index copy'
import {
	PlusOutlined,
	CheckCircleOutlined,
	SendOutlined,
} from '@ant-design/icons'

import { Button } from '../../components/button'
import {
	getRequestsCount,
	fromWeiToEther,
	getApproversCount,
	approveRequest,
	finilizeRequest,
} from '../../api/web3Api'
import DfundContract from '../../contracts/Dfund.json'

import { useQuery, useMutation } from 'react-query'
const ViewRequestPage = ({ isCreator }) => {
	// const history = useHistory()
	const { web3, accounts, contract } = useContext(FactoryContext)
	const { isAuthenticated } = useContext(AuthContext)

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
				message.success('Approved')
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
		if (requestCount.data || requestCount.data === 0) {
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
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
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
					parseInt(item.approvalCount) >=
					parseInt(approversCount.data) / 2
				// 	||
				// parseInt(item.approvalCount) ===
				// 	parseInt(approversCount.data) / 2
				if (!isAuthenticated && !isCompleted)
					return <Tag color={'red'}>Login to perform actions</Tag>
				if (isCompleted) return <Tag color={'green'}>Finilized</Tag>
				return (
					<div>
						<Button
							type='primary'
							variant='success'
							icon={<CheckCircleOutlined />}
							onClick={() => {
								// console.log(index)
								onApproveRequest(index)
							}}
							// loading={approveCampaignRequest.isLoading}
							disabled={isCompleted || isCreator}
							style={{ marginRight: '0.2rem' }}
						>
							Approve
						</Button>
						<Button
							type='primary'
							danger
							variant='danger'
							// disabled
							onClick={() => {
								// console.log(index)
								onFinilizeRequest(index)
							}}
							// loading={finilizeCampaignRequest.isLoading}
							disabled={
								isCompleted || !isReadyToFinilize || !isCreator
							}
							icon={<SendOutlined />}
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
		<>
			{/* <Layout>
				<div
					className='Center'
					style={{
						minHeight: '60vh',
					}}
				> */}
			{/* <h1> Campaign Requests Details</h1> */}
			<br />
			{isAuthenticated && isCreator && (
				// <Link
				// 	to={`/campaign/${campaign}/requests/new`}
				// 	style={{ marginBottom: '2rem', float: 'right' }}
				// >
				<Button
					type='primary'
					variant='primary'
					style={{ marginBottom: '2rem', float: 'right' }}
					icon={<PlusOutlined />}
					onClick={showModal}
				>
					Create Request
				</Button>
				// </Link>
			)}
			<Modal
				title='Create Spending Request'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<CreateRequestPage />
			</Modal>
			<br />
			<p>(Total {requestCount.data} requests found.)</p>

			<Table
				rowClassName={(record, index) => {
					// console.log(record)
					return record.complete ? 'table-row-complete' : ''
				}}
				columns={columns}
				dataSource={dataSource}
				loading={requests.isLoading}
			/>
			{/* </div>
			</Layout> */}
		</>
	)
}

export default ViewRequestPage
