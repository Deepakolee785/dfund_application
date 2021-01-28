import React, { useContext } from 'react'
import { Form, Input, Button, InputNumber } from 'antd'
import { useMutation } from 'react-query'
import FactoryContext from '../../context/factory/factoryContext'
import { useParams, useHistory } from 'react-router-dom'
import { fromEtherToWei, getCampaignSpendingRequests } from '../../api/web3Api'

const CreateRequestPage = () => {
	const { campaign } = useParams()
	const history = useHistory()
	const { accounts, web3 } = useContext(FactoryContext)
	const createRequest = useMutation(
		data => getCampaignSpendingRequests(web3, campaign, data, accounts[0]),
		{
			onSuccess: data => {
				history.push(`/campaign/${campaign}/requests`)
				const {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
					// events: {
					// 	LogContributionSent: {
					// 		type,
					// 		returnValues: {
					// 			amount,
					// 			contributor,
					// 			projectAddress,
					// 		},
					// 	},
					// },
				} = data
				const myData = {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
				}
				console.log(myData)
			},
		}
	)
	const onFinish = values => {
		// console.log('Success:', values)
		const data = {
			...values,
			value: fromEtherToWei(web3, values.value.toString()),
		}
		// console.log(data)
		createRequest.mutate(data)
	}

	return (
		<div
			className='Center'
			style={{
				minHeight: '60vh',
			}}
		>
			<h1>Create Campaign Request</h1>
			<br />
			<Form onFinish={onFinish}>
				<Form.Item
					label='Description'
					name='description'
					rules={[
						{ required: true, message: 'Please input your desc!' },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Amount(Eth)'
					name='value'
					rules={[
						{ required: true, message: 'Please input  value!' },
					]}
				>
					<InputNumber
						style={{ width: '100%' }}
						placeholder='amount in eth'
					/>
				</Form.Item>
				<Form.Item
					label='Recipient address'
					name='recipient'
					rules={[
						{ required: true, message: 'Please input your desc!' },
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' block>
						Create Request!
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
export default CreateRequestPage
