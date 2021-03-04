import React, { useContext } from 'react'
import { Form, Input, Button, InputNumber, message } from 'antd'
import { useMutation } from 'react-query'
import FactoryContext from '../../context/factory/factoryContext'
import { useParams, useHistory } from 'react-router-dom'
import {
	fromEtherToWei,
	fromWeiToEther,
	getCampaignSpendingRequests,
} from '../../api/web3Api'
import Layout from '../../layout/user_layout'
import { saveRequest } from '../../api/request'

const CreateRequestPage = () => {
	const { campaign } = useParams()
	const history = useHistory()
	const { accounts, web3 } = useContext(FactoryContext)
	const createRequest = useMutation(
		data => getCampaignSpendingRequests(web3, campaign, data, accounts[0]),
		{
			onSuccess: data => {
				//console.log(data)
				const {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
					events: {
						LogRequestCreated: {
							returnValues: {
								description,
								maker,
								recipient,
								value,
							},
						},
					},
				} = data
				const myData = {
					campaign,
					description,
					maker,
					recipient,
					value: fromWeiToEther(web3, value),
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
					complete: false,
				}
				saveRequest(myData)
					.then(res => {
						// console.log(res.data)
						message.success('Request saved.')
						history.push(`/campaign/${campaign}/requests`)
					})
					.catch(err => {
						message.success('Error saving request in DB.')

						console.log(err)
					})
				// console.log('request', myData)
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
		// return
		createRequest.mutate(data)
	}

	return (
		<Layout>
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
							{
								required: true,
								message: 'Please input your desc!',
							},
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
							{
								required: true,
								message: 'Please input your desc!',
							},
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
		</Layout>
	)
}
export default CreateRequestPage
