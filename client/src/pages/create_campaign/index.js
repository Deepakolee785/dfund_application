import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, DatePicker, InputNumber, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useMutation } from 'react-query'

import FactoryContext from '../../context/factory/factoryContext'
import { fromEtherToWei, createCampaign } from '../../api/web3Api'
import { getCountries } from '../../api/getCountries'
import { saveCampaign } from '../../api/campaign'
import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import Uploader from '../../components/uploader'
import { FormDiv } from './style'
const { Option } = Select

const CreateCampaign = () => {
	const history = useHistory()
	const { contract, accounts, web3 } = useContext(FactoryContext)
	const create = useMutation(
		data => createCampaign(contract, data, accounts[0]),
		{
			onSuccess: data => {
				// console.log('created success', data)
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

				console.log('Created Data: ', myData)
				saveCampaign(myData)
					.then(res => {
						console.log(res.data)
						history.push(`/campaign/${addr}`)
					})
					.catch(err => {
						console.log(err)
					})
			},
		}
	)

	const [imageHash, setImageHash] = useState('')
	// const [uploading, setUploading] = useState(false)
	// const captureImage = e => {
	// 	setUploading(true)
	// 	const file = e.target.files[0]
	// 	const reader = new window.FileReader()
	// 	reader.readAsArrayBuffer(file)
	// 	reader.onloadend = () => {
	// 		const bufferArray = Buffer(reader.result)
	// 		console.log('buffer', bufferArray)
	// 		if (bufferArray) {
	// 			ipfs.add(bufferArray)
	// 				.then(result => {
	// 					console.log(result)
	// 					message.success('Uploaded to IPFS')
	// 					return setImageHash(result.path)
	// 				})
	// 				.catch(err => {
	// 					message.err('Error uploading to IPFS')
	// 					console.error(err)
	// 				})
	// 				.finally(() => setUploading(false))
	// 		}
	// 	}
	// }

	const onFinish = values => {
		// console.log(values)
		const data = {
			...values,
			goalAmount: fromEtherToWei(web3, values.goalAmount.toString()),
			minContribution: fromEtherToWei(
				web3,
				values.minContribution.toString()
			),
			deadline: Number(values.deadline),
			imagehash: imageHash,
		}
		// console.log(data)

		//create campaign
		create.mutate(data)
	}

	const [countires, setCountires] = useState([])

	useEffect(() => {
		let isMounted = true
		getCountries().then(data => {
			if (data) {
				if (isMounted) setCountires(data)
			}
			return
		})
		return () => {
			isMounted = false
		}
	}, [])

	return (
		<Layout>
			<Header heading='Create a new Dfund campaign here ' />
			<br />
			<FormDiv>
				<Form name='createCampaign' onFinish={onFinish}>
					<Uploader
						setImageHash={setImageHash}
						label='Campaign Image'
						description='This is main image associated with your project. Add
							make it count and please provide a professional
							photo.'
					/>
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
							{
								required: true,
								message: 'Cateogry is required',
							},
						]}
					>
						<Select placeholder='Select category' allowClear>
							<Option value='food'>Food</Option>
							<Option value='technology'>Technology</Option>
							<Option value='art'>Art</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name='country'
						label='country'
						rules={[
							{
								required: true,
								message: 'Country is required',
							},
						]}
					>
						<Select
							placeholder='Select Country'
							// onChange={onGenderChange}
							allowClear
							showSearch
							filterOption={(input, option) =>
								option.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
						>
							{countires.map((country, index) => {
								return (
									<Option key={index} value={country.name}>
										{country.name}
									</Option>
								)
							})}
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
					{/* <Form.Item
						label='Image '
						name='imagehash'
						rules={[
							{
								required: true,
								message: 'imagehash is required',
							},
						]}
					>
						<Input type='file' onChange={captureImage} />
					</Form.Item>
					{uploading && <Spin />}
					{imageHash !== '' && (
						<img
							src={`${IPFS_INFURA_URL}/${imageHash}`}
							alt=''
							height='300'
							width='300'
						/>
					)} */}
					<br />
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
			</FormDiv>
		</Layout>
	)
}

export default CreateCampaign
