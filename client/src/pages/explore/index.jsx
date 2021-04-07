import React, {
	useContext,
	useState,
	//  useEffect
} from 'react'
import { v4 as uuid } from 'uuid'
import { Divider, Spin, Row, Col, Select, Tag, Slider } from 'antd'
import FactoryContext from '../../context/factory/factoryContext'
import { PlusOutlined } from '@ant-design/icons'

// import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'

import {
	// getAllCampaigns,
	// getCampaignDetails,
	fromWeiToEther,
} from '../../api/web3Api'
import { Button } from '../../components/button'
// import { IPFS_INFURA_URL } from '../../config'

import Layout from '../../layout/user_layout'
import { countries as allCountires } from 'countries-list'

import CampaignsNotFound from '../../assets/images/campaign_not_found.svg'
import {
	//  CardEl,
	Container,
} from './style'
import Header from '../../components/header'
import { SelectEl, Label } from './style'
import CardItem from '../../components/card_item'
import { InputEl } from '../create_campaign/style'
import useCampaigns from '../../hooks/useCampaigns'
import { categories } from '../../utils/campaign_categories'

const { Option } = Select

const ExplorePage = () => {
	const {
		web3,
		// accounts, contract
	} = useContext(FactoryContext)

	const { myData, campaignInfo: info } = useCampaigns()

	const [countries] = useState(
		Object.entries(allCountires).map(item => item[1])
	)
	const [selectedCountry, setSelectedCountry] = useState('all')
	const filterByCountry = rows => {
		if (selectedCountry === 'all') return rows
		return rows.filter(
			row =>
				row.country.toLowerCase().indexOf(selectedCountry.toLowerCase()) > -1
		)
	}
	const [selectedCategory, setSelectedCategory] = useState('all')
	const filterByCategory = rows => {
		if (selectedCategory === 'all') return rows
		return rows.filter(
			row =>
				row.category.toLowerCase().indexOf(selectedCategory.toLowerCase()) > -1
		)
	}

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
	const [goalAmountRange, setGoalAmountRange] = useState([0, 10000])
	const filterByGoalAmount = rows => {
		return rows.filter(row => {
			const amt = fromWeiToEther(web3, row.goalAmount)
			if (amt >= goalAmountRange[0] && amt <= goalAmountRange[1]) return true
			else return false
			// row.goalAmount.toLowerCase().indexOf(query) > -1
		})
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
						Error fetching Campaigns. Please make sure contract is migrated and
						Metamask has been installed.
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
						<>
							<Row
								justify='space-between'
								align='middle'
								style={{ margin: '2rem 0' }}
							>
								<Col>
									<Label
										style={{ marginBottom: '2rem' }}
									>{`Goal Amount(${goalAmountRange[0]} ETH - ${goalAmountRange[1]} ETH)`}</Label>

									<Slider
										range
										step={1}
										max={10000}
										dots={true}
										defaultValue={goalAmountRange}
										onChange={val => setGoalAmountRange(val)}
										style={{ width: '18rem' }}

										// onAfterChange={onAfterChange}
									/>
								</Col>
								<Col>
									<Label>Filter by Status</Label>
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
									<Label>Filter by Category</Label>
									<SelectEl
										placeholder='Select category'
										// allowClear
										style={{
											width: '15rem',
										}}
										onChange={val => setSelectedCategory(val)}
									>
										{categories.map(category => (
											<Option value={category}>{category}</Option>
										))}
										{/* <Option value='all'>All</Option>
										<Option value='food'>Food</Option>
										<Option value='technology'>
											Technology
										</Option>
										<Option value='art'>Art</Option> */}
									</SelectEl>
								</Col>
								<Col>
									<Label>Filter by Country</Label>

									<SelectEl
										placeholder='Select Country'
										// allowClear
										showSearch
										style={{
											width: '15rem',
										}}
										filterOption={(input, option) =>
											option.children
												.toLowerCase()
												.indexOf(input.toLowerCase()) >= 0
										}
										onChange={val => setSelectedCountry(val)}
									>
										<Option value='all'>All </Option>
										{countries &&
											countries.map((country, index) => {
												return (
													<Option key={index} value={country.name}>
														{country.name}
													</Option>
												)
											})}
									</SelectEl>
								</Col>
								<Col>
									<Label
										style={{
											marginTop: '1.5rem',
										}}
									>
										Search by Title
									</Label>

									<InputEl
										placeholder='Search by Title'
										style={{ width: '79vw' }}
										onChange={e => setQuery(e.target.value)}
									/>
								</Col>
							</Row>
							{/* <Row> */}
							{/* <Col>
									<p>{`Goal Amount(${goalAmountRange[0]} ETH - ${goalAmountRange[1]} ETH)`}</p>
									<Slider
										range
										step={1}
										max={1000}
										dots={true}
										defaultValue={goalAmountRange}
										onChange={val =>
											setGoalAmountRange(val)
										}
										style={{ width: '15rem' }}
										// onAfterChange={onAfterChange}
									/>
								</Col> */}
							{/* </Row> */}
						</>
					)}
					<p>
						{myData.length !== 0 && `Total ${myData.length} items available`}
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
							search(
								filterByStatus(
									filterByCountry(filterByCategory(filterByGoalAmount(myData)))
								)
							).map((data, index) => {
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
											address={data.campaignAdd}
											fundedBalance={fromWeiToEther(web3, data.fundedBalance)}
											fundedPercentage={fundedPercentage}
											goalAmount={fromWeiToEther(web3, data.goalAmount)}
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
