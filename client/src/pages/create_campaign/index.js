import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Select, Row, Col, Radio, message } from 'antd'
import { useMutation } from 'react-query'
import moment from 'moment'
import { countries as allCountires } from 'countries-list'

import FactoryContext from '../../context/factory/factoryContext'
import {
	fromEtherToWei,
	createCampaign,
	fromWeiToEther,
} from '../../api/web3Api'
// import { getCountries } from '../../api/getCountries'
import { saveCampaign } from '../../api/campaign'
import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import Uploader from '../../components/uploader'
import {
	DatePickerEl,
	FormDiv,
	InputEl,
	InputNumberEl,
	Label,
	SelectEl,
	SubText,
	TextAreaEl,
} from './style'
import { Button } from '../../components/button'
import LunchIcon from '../../assets/icons/startup.svg'
import AuthContext from '../../context/auth/authContext'
import { checkNumberKey } from '../../utils/checkValidInput'
const { Option } = Select

const dateFormat = 'YYYY/MM/DD'

const CreateCampaign = () => {
	const history = useHistory()
	const [campaignForm] = Form.useForm()
	const { contract, accounts, web3 } = useContext(FactoryContext)
	const { user } = useContext(AuthContext)
	const [deadlineDaysValue, setDeadlineDaysValue] = useState(30)
	useEffect(() => {
		campaignForm.setFieldsValue({
			deadline: moment(new Date(), dateFormat).add('days', 30),
		})
		// eslint-disable-next-line
	}, [])
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
					user: user._id,
					blockHash,
					blockNumber,
					cumulativeGasUsed,
					type: type || 'mined',
					addr,
					category,
					country,
					creator,
					deadline,
					description,
					goalAmount: fromWeiToEther(web3, goalAmount),
					imageHash,
					minimumContribution: fromWeiToEther(
						web3,
						minimumContribution
					),
					title,
					status,
					to,
					transactionHash,
				}

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
	const onFinish = values => {
		// console.log(values)
		if (values.goalAmount < 0.1)
			return message.error('Goal Amount must me greater than 0.1 ETH')
		if (values.minContribution >= values.goalAmount)
			return message.error(
				'Min contribution must be less than goal amount'
			)
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

		//create campaign

		create.mutate(data)
	}
	const [countries] = useState(
		Object.entries(allCountires).map(item => item[1])
	)

	// useEffect(() => {
	// 	let isMounted = true
	// 	getCountries().then(data => {
	// 		if (data) {
	// 			if (isMounted) setCountires(data)
	// 		}
	// 		return
	// 	})
	// 	return () => {
	// 		isMounted = false
	// 	}
	// }, [])

	return (
		<Layout>
			<Header heading='Create a new Dfund campaign here ' />
			<br />
			<FormDiv>
				<Form
					name='createCampaign'
					onFinish={onFinish}
					form={campaignForm}
				>
					{/* Campaign Image Uploader */}
					<Uploader
						setImageHash={setImageHash}
						label='Campaign Image'
						description='This is main image associated with your project. Add
							make it count and please provide a professional
							photo.'
					/>
					<div>
						<Label htmlFor='title'>Title of Campaign</Label>
						<Form.Item
							// label='Title'
							name='title'
							rules={[
								{
									required: true,
									message: '*Campaign Title is required!',
								},
							]}
						>
							<InputEl placeholder='Eg. My new campaign for today' />
						</Form.Item>
						<SubText>
							<span style={{ color: 'red', fontSize: '1rem' }}>
								*
							</span>
							Your campaign title should be simple, specific and
							memorable. Our search method run through these
							sections of your campaign , so be sure to incoprate
							any key words here! These will help people find your
							campaign so choose them wisely.
						</SubText>
					</div>

					<div>
						<Label htmlFor='goalAmount'>
							{`Goal amount (> 0.1 Eth)`}
						</Label>
						<Form.Item
							name='goalAmount'
							rules={[
								{
									required: true,
									message: '*Goal amount is required!',
								},
							]}
						>
							<InputNumberEl
								// style={{ width: '100%' }}
								placeholder='Eg. 100 (in ETH)'
								onKeyDown={checkNumberKey}
							/>
						</Form.Item>
					</div>
					<div>
						<Label htmlFor='minContribution'>
							{`Minimum Contribution (< goal amount)`}
						</Label>
						<Form.Item
							name='minContribution'
							rules={[
								{
									required: true,
									message:
										'*Minimum Contribution is required!',
								},
							]}
						>
							<InputNumberEl
								// style={{ width: '100%' }}
								placeholder='Eg. 10 (in ETH)'
								onKeyDown={checkNumberKey}
							/>
						</Form.Item>
						<SubText>
							<span style={{ color: 'red', fontSize: '1rem' }}>
								*
							</span>
							Minimum contribution is minimum amount a contributor
							must fund in the project to be considered as approve
							of campaign and can approve the any spending request
							created by you.
						</SubText>
					</div>
					<Row gutter={10}>
						<Col flex='auto'>
							<div>
								<Label htmlFor='category'>
									Select your category
								</Label>
								<Form.Item
									name='category'
									rules={[
										{
											required: true,
											message: '*Cateogry is required!',
										},
									]}
								>
									<SelectEl
										placeholder='Select category'
										allowClear
									>
										<Option value='food'>Food</Option>
										<Option value='technology'>
											Technology
										</Option>
										<Option value='art'>Art</Option>
									</SelectEl>
								</Form.Item>
							</div>
						</Col>
						<Col flex='auto'>
							<div>
								<Label htmlFor='country'>
									Select your Country
								</Label>
								<Form.Item
									name='country'
									rules={[
										{
											required: true,
											message: '*Country is required!',
										},
									]}
								>
									<SelectEl
										placeholder='Select Country'
										allowClear
										showSearch
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >=
											0
										}
									>
										{countries &&
											countries.map((country, index) => {
												return (
													<Option
														key={index}
														value={country.name}
													>
														{country.name}
													</Option>
												)
											})}
									</SelectEl>
								</Form.Item>
							</div>
						</Col>
					</Row>

					<div>
						<Label htmlFor='description'>
							Enter your campaign story
						</Label>
						<Form.Item
							name='description'
							rules={[
								{
									required: true,
									message: '*Campaign Story is required!',
								},
							]}
						>
							<TextAreaEl placeholder='Your story goes here...' />
						</Form.Item>
					</div>

					<div>
						<Label htmlFor='deadline'>
							Duration of your campaign
						</Label>
						<Row gutter={[10, 10]} justify='space-between'>
							<Col>
								<Radio.Group
									value={deadlineDaysValue}
									onChange={e => {
										// console.log(e.target.value)
										const days = e.target.value
										setDeadlineDaysValue(days)
										// console.log(new Date())
										campaignForm.setFieldsValue({
											deadline: moment(
												new Date(),
												dateFormat
											).add('days', days),
										})
									}}
								>
									<Radio.Button
										value={15}
										style={{
											width: '12rem',
											textAlign: 'center',
										}}
									>
										15 Days
									</Radio.Button>
									<Radio.Button
										value={30}
										style={{
											width: '12rem',
											textAlign: 'center',
										}}
									>
										30 Days
									</Radio.Button>
									<Radio.Button
										value={60}
										style={{
											width: '12rem',
											textAlign: 'center',
										}}
									>
										60 days
									</Radio.Button>
								</Radio.Group>
							</Col>

							<Col style={{ marginTop: '-0.6rem' }}>
								<hr />
								OR
								<hr />
							</Col>
							<Col flex='auto'>
								<Form.Item
									name='deadline'
									rules={[
										{
											required: true,
											message: '*Deadline is required!',
										},
									]}
								>
									<DatePickerEl
										format={dateFormat}
										style={{ width: '100%' }}
									/>
								</Form.Item>
							</Col>
						</Row>
					</div>

					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								loading={create.isLoading}
								// block
								variant='primary'
								icon={
									<img
										src={LunchIcon}
										alt=''
										style={{
											width: '20px',
											marginRight: '0.3rem',
										}}
									/>
								}
							>
								Lunch your new Dfund!
							</Button>
						</Form.Item>
					</div>
				</Form>
			</FormDiv>
		</Layout>
	)
}

export default CreateCampaign
