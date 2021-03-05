import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import {
	Divider,
	Spin,
	// Image, Progress,
	Row,
	Col,
	Select,
} from 'antd'
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

	// console.log(myData)

	return (
		<Layout>
			<Header
				heading='Explore'
				subHeading='We help make any idea a reality through crowdfunding. Discover and support these 
crowdfunding campaigns today.'
			/>
			<Container>
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
								<SelectEl
									placeholder='Select category'
									allowClear
									style={{
										width: '20rem',
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
								<SelectEl
									placeholder='Select Location'
									allowClear
									style={{
										width: '20rem',
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
								<SelectEl
									placeholder='Trending'
									allowClear
									style={{
										width: '20rem',
									}}
								>
									<Option value='food'>Food</Option>
									<Option value='technology'>
										Technology
									</Option>
									<Option value='art'>Art</Option>
								</SelectEl>
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
							myData.map((data, index) => {
								const fundedPercentage = (
									(parseFloat(data.fundedBalance) /
										parseFloat(data.goalAmount)) *
									100
								).toFixed(0)
								// console.log(data)
								return (
									<Col key={uuid()}>
										<CardItem
											title={data.title}
											imageHash={data.imageHash}
											address={info.data[index]}
											fundedBalance={fromWeiToEther(
												web3,
												data.fundedBalance
											)}
											fundedPercentage={fundedPercentage}
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
							})}
					</Row>
				</div>
			</Container>
		</Layout>
	)
}

export default ExplorePage
