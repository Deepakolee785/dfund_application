import { useEffect, useState } from 'react'
import { getAllTransactions } from '../../../api/transaction'
import { v4 as uuid } from 'uuid'
import { Tooltip, Button as AntButton } from 'antd'
import { Table } from 'ant-table-extensions'
import { InfoCircleOutlined } from '@ant-design/icons'

import { LinkLabel } from './style'
import {
	ROPSTEN_ETHERSCAN_URL,
	ROPSTEN_ETHERSCAN_TX_URL,
} from '../../../config'
import moment from 'moment'

export const ExternalLink = ({ href, addr }) => (
	<Tooltip title={addr}>
		<a href={href} target='_blank' rel='noopener noreferrer'>
			<LinkLabel>{addr}</LinkLabel>
		</a>
	</Tooltip>
)

const Transaction = () => {
	const [transaction, setTransactions] = useState(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		getAllTransactions()
			.then(res => {
				// console.log(res)
				setTransactions(res.data.transactions)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false))
	}, [])

	const columns = [
		{
			title: 'Sender',
			dataIndex: 'sender',
			key: 'sender',
			render: sender => {
				const href = `${ROPSTEN_ETHERSCAN_URL}/${sender}`
				return <ExternalLink href={href} addr={sender} />
			},
		},
		{
			title: 'Reciver',
			dataIndex: 'reciver',
			key: 'reciver',
			render: receiver => {
				const href = `${ROPSTEN_ETHERSCAN_URL}/${receiver}`
				return <ExternalLink href={href} addr={receiver} />
			},
		},
		{
			title: 'Campaign',
			dataIndex: 'projectAddress',
			key: 'projectAddress',
			render: projectAddress => {
				const href = `${ROPSTEN_ETHERSCAN_URL}/${projectAddress}`
				return <ExternalLink href={href} addr={projectAddress} />
			},
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
		// {
		// 	title: 'Block Hash',
		// 	dataIndex: 'blockHash',
		// 	key: 'blockHash',
		// 	render: blockHash => {
		// 		return (
		// 			<a
		// 				href={`${ROPSTEN_ETHERSCAN_URL}/${blockHash}`}
		// 				target='_blank'
		// 				rel='noopener noreferrer'
		// 			>
		// 				<LinkLabel>{blockHash}</LinkLabel>
		// 			</a>
		// 		)
		// 	},
		// },
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
		// {
		// 	title: 'status',
		// 	dataIndex: 'status',
		// 	key: 'status',
		// },
		{
			title: 'Transaction Hash',
			dataIndex: 'transactionHash',
			key: 'transactionHash',
			render: transactionHash => {
				const href = `${ROPSTEN_ETHERSCAN_TX_URL}/${transactionHash}`
				return <ExternalLink href={href} addr={transactionHash} />
			},
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: addr => {
				return (
					<Tooltip title='View more in Etherscan'>
						<a
							href={`${ROPSTEN_ETHERSCAN_TX_URL}/${addr}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							<AntButton
								type='primary'
								shape='circle'
								icon={<InfoCircleOutlined />}
								style={{
									marginLeft: '1px',
									backgroundColor: '#E64560',
									borderColor: '#E64560',
								}}
							/>
						</a>
					</Tooltip>
				)
			},
		},
	]

	const dataSource =
		transaction &&
		transaction.map(transaction => {
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
				createdAt: moment(createdAt).format('MMMM Do, YYYY HH:mm a'),
				action: transactionHash,
			}
		})
	return (
		<div>
			<h1>All Transactions</h1>
			<Table
				searchable
				bordered
				exportable
				exportableProps={{ showColumnPicker: true }}
				searchableProps={{ fuzzySearch: true }}
				scroll={{ x: true }}
				loading={loading}
				dataSource={dataSource}
				columns={columns}
			/>
		</div>
	)
}

export default Transaction
