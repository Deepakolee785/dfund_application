import React, { useContext, useEffect } from 'react'
import { Button, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'
import FactoryContext from '../../context/factory/factoryContext'
import { getRequestsCount, fromWei } from '../../api/web3Api'
import DfundContract from '../../contracts/Dfund.json'

import { useQuery } from 'react-query'
const ViewRequestPage = () => {
	const { web3, accounts, contract } = useContext(FactoryContext)

	const { campaign } = useParams()

	const isReady =
		typeof web3 !== 'undefined' &&
		contract.length !== 0 &&
		accounts.length !== 0

	const requestCount = useQuery(
		['campaign_requests'],
		() => getRequestsCount(web3, campaign),
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
						console.log('called')
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

	// console.log(requests)
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
				amt: fromWei(web3, item.value),
				recipient: item.recipient,
				approval: item.approvalCount,
				action: item,
			}
		})

	return (
		<div>
			<Link to={`/campaign/${campaign}/requests/new`}>
				<Button type='primary'>Create Request</Button>
			</Link>
			<br />
			<Table
				columns={columns}
				dataSource={dataSource}
				loading={requests.isLoading}
			/>
		</div>
	)
}

export default ViewRequestPage
