import { useEffect, useState } from 'react'
import { getAllTransactions } from '../../../api/transaction'
import { v4 as uuid } from 'uuid'
import { Table } from 'antd'
const Transaction = () => {
	const [transaction, setTransactions] = useState(null)
	useEffect(() => {
		getAllTransactions()
			.then(res => {
				// console.log(res)
				setTransactions(res.data.transactions)
			})
			.catch(err => console.log(err))
	}, [])

	const columns = [
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
				createdAt,
			}
		})
	return (
		<div>
			<h1>Transaction</h1>
			<Table
				dataSource={dataSource}
				columns={columns}
				scroll={{ x: true }}
			/>
			;
			{/* <pre>{transaction && JSON.stringify(transaction, null, 6)}</pre> */}
		</div>
	)
}

export default Transaction
