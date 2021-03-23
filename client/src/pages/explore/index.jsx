import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Divider, Spin, Row, Col, Select, Tag } from 'antd'
import FactoryContext from '../../context/factory/factoryContext'
import { PlusOutlined } from '@ant-design/icons'

import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'

import {
	getAllCampaigns,
	getCampaignDetails,
	fromWeiToEther,
} from '../../api/web3Api'
import { Button } from '../../components/button'
// import { IPFS_INFURA_URL } from '../../config'

import Layout from '../../layout/user_layout'

import CampaignsNotFound from '../../assets/images/campaign_not_found.svg'
import {
	//  CardEl,
	Container,
} from './style'
import Header from '../../components/header'
import { SelectEl } from './style'
import CardItem from '../../components/card_item'
import { InputEl } from '../create_campaign/style'

const { Option } = Select

const ExplorePage = () => {
	const { web3, accounts, contract } = useContext(FactoryContext)

	const isReady =
		typeof web3 !== 'undefined' &&
		contract.length !== 0 &&
		accounts.length !== 0

	const info = useQuery(
		['deployed_campaigns'],
		() => getAllCampaigns(contract),
		{
			enabled: isReady,
		}
	)
	const getContractBalance = campaignAdd => {
		return web3.eth
			.getBalance(campaignAdd)
			.then(data => data)
			.catch(err => 'N/A')
	}

	const [myData, setMyData] = useState([])
	useEffect(() => {
		let isMounted = true
		if (info.data && info.data.length !== 0 && isReady) {
			// eslint-disable-next-line
			{
				let myCampaignsList = []
				// eslint-disable-next-line
				info.data.map(async campaignAdd => {
					if (campaignAdd) {
						const balance = await getContractBalance(campaignAdd)
						getCampaignDetails(web3, campaignAdd)
							.then(data => {
								// console.log(data)
								myCampaignsList.push(data)
								if (isMounted)
									setMyData(oldData => [
										...oldData,
										{
											...data,
											fundedBalance: balance,
										},
									])
							})
							.catch(err => console.log(err))
					}
					// eslint-disable-next-line
				})
				// console.log(myCampaignsList)
				// setMyData(myCampaignsList)
			}
		}
		return () => {
			isMounted = false
		}
		// eslint-disable-next-line
	}, [info.data])

	const [status, setStatus] = useState('all')
	const filterByStatus = rows => {
		return rows.filter(row => {
			if (status === 'active') return row.active
			else if (status === 'inactive') return !row.active
			else return true
		})
	}
	const [query, setQuery] = useState('')
	const search = rows => {
		return rows.filter(row => row.title.toLowerCase().indexOf(query) > -1)
	}

	return (
		<Layout>
			<Header
				heading='Explore'
				subHeading='We help make any idea a reality through crowdfunding. Discover and support these 
crowdfunding campaigns today.'
			/>
			<Container>
				{info.isError && (
					<Tag
						color='red'
						style={{ padding: '1rem', marginTop: '1rem' }}
						className='Center'
					>
						Error fetching Campaigns. Please make sure contract is
						migrated and Metamask has been installed.
					</Tag>
				)}
				<div>
					{info.data && info.data.length === 0 && (
						<div className='Center' style={{ minHeight: '70vh' }}>
							{/* <h4 style={{ color: 'red' }}>
								No Campaigns available right now. Create your
								campaign here.
							</h4> */}
							<img
								src={CampaignsNotFound}
								alt='No Campaigns available'
								style={{ marginBottom: '2rem', width: '25rem' }}
							/>
							<Link to='/create/campaign'>
								<Button
									type='primary'
									variant='primary'
									icon={<PlusOutlined />}
								>
									Create campaign
								</Button>
							</Link>
						</div>
					)}
					{myData.length !== 0 && (
						<Row
							justify='space-between'
							style={{ margin: '2rem 0' }}
						>
							<Col>
								<p>Filter by Status</p>
								<SelectEl
									placeholder='Select Status'
									// allowClear
									style={{
										width: '15rem',
									}}
									onChange={val => setStatus(val)}
									// defaultValue='all'
								>
									<Option value='all'>All</Option>
									<Option value='active'>Active</Option>
									<Option value='inactive'>Terminated</Option>
								</SelectEl>
							</Col>
							<Col>
								<p>Filter by Category</p>
								<SelectEl
									placeholder='Select category'
									allowClear
									style={{
										width: '15rem',
									}}
								>
									<Option value='food'>Food</Option>
									<Option value='technology'>
										Technology
									</Option>
									<Option value='art'>Art</Option>
								</SelectEl>
							</Col>
							<Col>
								<p>Filter by Country</p>

								<SelectEl
									placeholder='Select Country'
									allowClear
									style={{
										width: '15rem',
									}}
								>
									<Option value='food'>Food</Option>
									<Option value='technology'>
										Technology
									</Option>
									<Option value='art'>Art</Option>
								</SelectEl>
							</Col>
							<Col>
								<p style={{ marginBottom: '1.5rem' }}>Search</p>

								<InputEl
									placeholder='Search by ...'
									onChange={e => setQuery(e.target.value)}
								/>
								{/* <SelectEl
									placeholder='Trending'
									allowClear
									style={{
										width: '15rem',
									}}
								>
									<Option value='food'>Food</Option>
									<Option value='technology'>
										Technology
									</Option>
									<Option value='art'>Art</Option>
								</SelectEl> */}
							</Col>
						</Row>
					)}
					<p>
						{myData.length !== 0 &&
							`Total ${myData.length} items available`}
					</p>
					{info.isLoading && (
						<Spin
							size='large'
							style={{
								height: '90vh',
								width: '80vw',
							}}
							className='Center'
						/>
					)}
					<Row gutter={[15, 15]}>
						{myData.length !== 0 &&
							search(filterByStatus(myData)).map(
								(data, index) => {
									const fundedPercentage = (
										(parseFloat(data.fundedBalance) /
											parseFloat(data.goalAmount)) *
										100
									).toFixed(0)
									// console.log(data)
									return (
										<Col key={uuid()}>
											<CardItem
												isActive={data.active}
												title={data.title}
												imageHash={data.imageHash}
												address={info.data[index]}
												fundedBalance={fromWeiToEther(
													web3,
													data.fundedBalance
												)}
												fundedPercentage={
													fundedPercentage
												}
												goalAmount={fromWeiToEther(
													web3,
													data.goalAmount
												)}
												category={data.category}
												description={data.description}
											/>

											<Divider />
										</Col>
									)
								}
							)}
					</Row>
				</div>
			</Container>
		</Layout>
	)
}

export default ExplorePage
