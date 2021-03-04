import React, { useContext, useState, useEffect } from 'react'
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
									<Col key={index}>
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
										{/* <CardEl hoverable bordered>
											<Image
												style={{
													height: 300,
													maxWidth: '100%',
												}}
												src={`${IPFS_INFURA_URL}/${data.imageHash}`}
												fallback='data:image/png;base64,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'
											/>
											<div style={{ padding: '1rem' }}>
												<h3>{data.title}</h3>
												<Link
													to={`/campaign/${info.data[index]}`}
												>
													<p
														style={{
															color: 'blue',
															textDecoration:
																'underline',
														}}
													>
														{info.data[index]}
													</p>
												</Link>
												<div>
													<Progress
														strokeColor={{
															'0%': '#108ee9',
															'100%': '#87d068',
														}}
														percent={
															fundedPercentage
														}
														size='small'
													/>
													<p>{`${fromWeiToEther(
														web3,
														data.fundedBalance
													)}  of ${fromWeiToEther(
														web3,
														data.goalAmount
													)} ETH funded`}</p>
												</div>
												<Link
													to={`/campaign/${info.data[index]}`}
												>
													<Button type='default'>
														View details
													</Button>
												</Link>
											</div>
										</CardEl> */}
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
