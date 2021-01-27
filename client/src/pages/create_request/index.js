import React, { useContext } from 'react'
import { Form, Input, Button, InputNumber } from 'antd'
import { useMutation } from 'react-query'
import FactoryContext from '../../context/factory/factoryContext'
import { useParams, useHistory } from 'react-router-dom'
import DfundContract from '../../contracts/Dfund.json'
import { fromEtherToWei } from '../../api/web3Api'

const CreateRequestPage = () => {
	const { campaign } = useParams()
	const history = useHistory()
	const { accounts, web3 } = useContext(FactoryContext)
	const createRequest = useMutation(
		data => {
			let myCampaign = new web3.eth.Contract(DfundContract.abi, campaign)

			return myCampaign.methods
				.createRequest(data.description, data.value, data.recipient)
				.send({
					from: accounts[0],
				})
				.then(result => {
					console.log('created', result)
					return result
				})
		},
		{
			onSuccess: () => {
				history.push(`/campaign/${campaign}/requests`)
			},
		}
	)
	const onFinish = values => {
		console.log('Success:', values)
		const data = {
			...values,
			value: fromEtherToWei(web3, values.value.toString()),
		}
		console.log(data)
		createRequest.mutate(data)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
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
			<Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
