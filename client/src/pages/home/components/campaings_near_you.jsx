import { useEffect, useState } from 'react'
import { Row, Col, Tag, Spin, Alert } from 'antd'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { Container, Heading } from '../style'

import { fromWeiToEther } from '../../../api/web3Api'
import CardItem from '../../../components/card_item'

const CampaignsNearYou = ({ web3, myData, info }) => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		fetch('https://extreme-ip-lookup.com/json/')
			.then(res => res.json())
			.then(response => {
				// console.log('Country: ', response.country)
				setCountry(response.country)
			})
			.catch((data, status) => {
				// console.log('Request failed')
			})
	}, [])
	return (
		<Container>
			<Heading>Find campaigns near you</Heading>
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
			{info.data && info.data.length === 0 && (
				<Alert
					type='error'
					message='No campaigns available at Dfund Factory!'
				/>
			)}
			{info.isLoading && (
				<Spin
					size='large'
					style={{
						width: '80vw',
					}}
					className='Center'
				/>
			)}
			<Row gutter={[15, 15]}>
				{myData.length !== 0 &&
					country !== null &&
					myData
						.filter(c => c.country === country)
						.sort((a, b) => b.fundedBalance - a.fundedBalance)
						.slice(0, 4)
						.map((data, index) => {
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
										// description={data.description}
									/>
								</Col>
							)
						})}
			</Row>
			{info.data && info.data.length !== 0 && (
				<Link
					to='/explore'
					style={{
						color: '#5f66f1',
						textDecoration: 'underline',
						fontWeight: 500,
						float: 'right',
						marginTop: '0.3rem',
					}}
				>
					View all
				</Link>
			)}
		</Container>
	)
}

export default CampaignsNearYou
