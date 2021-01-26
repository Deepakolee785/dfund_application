import React, { useContext } from 'react'
import { Form, Input, Button, InputNumber } from 'antd'
import { useMutation } from 'react-query'
import FactoryContext from '../../context/factory/factoryContext'
import { useParams } from 'react-router-dom'
import DfundContract from '../../contracts/Dfund.json'

const CreateRequestPage = () => {
	const { campaign } = useParams()
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
				// history.push('/')
			},
		}
	)
	const onFinish = values => {
		console.log('Success:', values)
		createRequest.mutate(values)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}
	return (
		<Form
			initialValues={{}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label='Description'
				name='description'
				rules={[{ required: true, message: 'Please input your desc!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Amount'
				name='value'
				rules={[{ required: true, message: 'Please input  value!' }]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item
				label='Recipient address'
				name='recipient'
				rules={[{ required: true, message: 'Please input your desc!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
export default CreateRequestPage
