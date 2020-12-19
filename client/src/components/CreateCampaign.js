import React, { useContext } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useMutation } from 'react-query'
import FactoryContext from '../context/factory/factoryContext'

const { Option } = Select

const CreateCampaign = () => {
	const { contract, accounts } = useContext(FactoryContext)
	const create = useMutation(data => {
		return contract.methods
			.createCampaign(
				data.title,
				data.description,
				data.category,
				data.country,
				data.goalAmount,
				data.minContribution,
				data.deadline,
				data.imagehash
			)
			.send({
				from: accounts[0],
			})
			.then(result => {
				console.log('created', result)
				return result
			})
	})
	const onFinish = values => {
		// console.log('Success:', values)

		const data = { ...values, deadline: Number(values.deadline) }
		console.log(data)

		create.mutate(data)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<h1>Create campaign here</h1>
			{/* <hr /> */}
			<Form
				name='basic'
				// initialValues={{ : true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Title'
					name='title'
					rules={[
						{
							required: true,
							message: 'Title is required',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Description'
					name='description'
					rules={[
						{
							required: true,
							message: 'Description is required',
						},
					]}
				>
					<TextArea />
				</Form.Item>

				<Form.Item
					name='category'
					label='Gender'
					rules={[{ required: true, message: 'Gender is required' }]}
				>
					<Select
						placeholder='Select category'
						// onChange={onGenderChange}
						allowClear
					>
						<Option value='food'>Food</Option>
						<Option value='technology'>Technology</Option>
						<Option value='art'>Art</Option>
					</Select>
				</Form.Item>
				<Form.Item
					name='country'
					label='country'
					rules={[{ required: true, message: 'Country is required' }]}
				>
					<Select
						placeholder='Select Country'
						// onChange={onGenderChange}
						allowClear
					>
						<Option value='Nepal'>Nepal</Option>
						<Option value='China'>China</Option>
						<Option value='India'>India</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label='Goal'
					name='goalAmount'
					rules={[
						{
							required: true,
							message: 'Goal amount is required',
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					label='Min contribution'
					name='minContribution'
					rules={[
						{
							required: true,
							message: 'Min contribution is required',
						},
					]}
				>
					<InputNumber />
				</Form.Item>

				<Form.Item
					label='Deadline'
					name='deadline'
					rules={[
						{
							required: true,
							message: 'deadline is required',
						},
					]}
				>
					<DatePicker />
				</Form.Item>

				<Form.Item
					label='Image hash'
					name='imagehash'
					rules={[
						{
							required: true,
							message: 'imagehash is required',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						loading={create.isLoading}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default CreateCampaign
