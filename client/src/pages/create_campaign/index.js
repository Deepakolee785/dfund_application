import React, { useContext } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useMutation } from 'react-query'

import FactoryContext from '../../context/factory/factoryContext'
import { fromEtherToWei, createCampaign } from '../../api/web3Api'

const { Option } = Select

const CreateCampaign = () => {
	const { contract, accounts, web3 } = useContext(FactoryContext)
	const create = useMutation(
		data => createCampaign(contract, data, accounts[0]),
		{
			onSuccess: data => {
				console.log('created success', data)
				const {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					status,
					to,
					transactionHash,
					events: {
						LogCampaignCreated: {
							type,
							returnValues: {
								addr,
								category,
								country,
								creator,
								deadline,
								description,
								goalAmount,
								imageHash,
								minimumContribution,
								title,
							},
						},
					},
				} = data

				const myData = {
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					type,
					addr,
					category,
					country,
					creator,
					deadline,
					description,
					goalAmount,
					imageHash,
					minimumContribution,
					title,
					status,
					to,
					transactionHash,
				}

				console.log(myData)
			},
		}
	)

	const onFinish = values => {
		const data = {
			...values,
			goalAmount: fromEtherToWei(web3, values.goalAmount.toString()),
			minContribution: fromEtherToWei(
				web3,
				values.minContribution.toString()
			),
			deadline: Number(values.deadline),
		}

		//create campaign
		create.mutate(data)
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				// width: '60vw',
			}}
		>
			<div
				style={{
					width: '40vw',
				}}
			>
				<h1>Create a new Dfund campaign here </h1>
				{/* <hr /> */}
				<Form name='createCampaign' onFinish={onFinish}>
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
						label='Category'
						rules={[
							{ required: true, message: 'Gender is required' },
						]}
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
						rules={[
							{ required: true, message: 'Country is required' },
						]}
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
						label='Goal(ETH)'
						name='goalAmount'
						rules={[
							{
								required: true,
								message: 'Goal amount is required',
							},
						]}
					>
						<InputNumber
							style={{ width: '100%' }}
							placeholder='Goal amount (in Eth)'

							// formatter={value => `ETH ${value}`}
							// parser={value => value.replace('ETH ', '')}
						/>
					</Form.Item>
					<Form.Item
						label='Min contribution(ETH)'
						name='minContribution'
						rules={[
							{
								required: true,
								message: 'Min contribution is required',
							},
						]}
					>
						<InputNumber
							style={{ width: '100%' }}
							placeholder='min contribution (in Eth)'
						/>
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
							block
						>
							Create new Dfund!
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default CreateCampaign
