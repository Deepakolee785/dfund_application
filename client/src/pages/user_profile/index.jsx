import { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Col, Row, Tabs, Divider, Table, Tag } from 'antd'
import { VideoCameraAddOutlined, TransactionOutlined } from '@ant-design/icons'
import AuthCotext from '../../context/auth/authContext.js'
import { Container } from '../../components/container'
import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import { IPFS_INFURA_URL } from '../../config.js'
import IconLabel from './icon_label/index.jsx'

import UserIcon from '../../assets/icons/user.svg'
import EmailIcon from '../../assets/icons/email.svg'
import WalletIcon from '../../assets/icons/wallet.svg'
import LocationIcon from '../../assets/icons/location.svg'
import CardItem from '../../components/card_item/index.jsx'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button/index.jsx'
import moment from 'moment'
import { ROPSTEN_ETHERSCAN_URL } from '../../config'

const { TabPane } = Tabs

const UserProfile = () => {
	const { user, loadUser } = useContext(AuthCotext)
	// console.log(user)

	const {
		username,
		email,
		wallet,
		imageHash,
		updatedAt,
		userCampaigns,
		userTransactions,
		country,
	} = user || {}

	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
	}, [])

	const columns = [
		// {
		// 	title: 'Reciver',
		// 	dataIndex: 'reciver',
		// 	key: 'reciver',
		// },
		{
			title: 'Amount(ETH)',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Campaign',
			dataIndex: 'campaign',
			key: 'campaign',
			render: campaign => {
				return <Link to={`/campaign/${campaign}`}>{campaign}</Link>
			},
		},
	]
	const dataSource =
		userTransactions &&
		userTransactions.map(transaction => {
			return {
				key: uuid(),
				reciver: transaction.reciver,
				amount: transaction.amount,
				type: transaction.transactionType,
				campaign: transaction.projectAddress,
			}
		})
	return (
		<Layout>
			<Header heading='Your Profile' />
			<Container>
				<div className='Center' style={{ marginTop: '1rem' }}>
					<img
						src={`${IPFS_INFURA_URL}/${imageHash}`}
						alt=''
						style={{
							width: '200px',
							height: '200px',
							borderRadius: '50%',
							border: '5px solid #5f66f1',
						}}
					/>
					<div>
						<IconLabel icon={UserIcon} label={username} />
						<IconLabel icon={EmailIcon} label={email} />
						<IconLabel icon={LocationIcon} label={country} />
						<Row align='middle'>
							<Col>
								<IconLabel icon={WalletIcon} label={wallet} />
							</Col>
							<Col>
								<a
									href={`${ROPSTEN_ETHERSCAN_URL}/${wallet}`}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button type='link'>View in Etherscan</Button>
								</a>
							</Col>
						</Row>
						<div style={{ margin: '1rem 0 1rem 2rem' }}>
							<p>
								<strong>Last Updated at:</strong>{' '}
								{moment(updatedAt).format('DD-MMM-YYYY')}
							</p>
							<Button type='primary' variant='primary'>
								Update Profile
							</Button>
						</div>
					</div>
				</div>
				<Tabs defaultActiveKey='1'>
					<TabPane
						tab={
							<span>
								<VideoCameraAddOutlined />
								Your Campaigns
							</span>
						}
						key='1'
					>
						{/* <pre>
							{user && JSON.stringify(userCampaigns, null, 6)}
						</pre> */}
						{userCampaigns && userCampaigns.length === 0 && (
							<>
								<Tag
									color='red'
									style={{
										padding: '1rem',
										marginTop: '1rem',
									}}
									className='Center'
								>
									You haven't created any Dfund campaign yet!
								</Tag>
								{/* <br />
								<Button type='primary' variant='primary'>
									Create new Dfund Campaign!
								</Button> */}
							</>
						)}
						<Row gutter={[15, 15]}>
							{userCampaigns &&
								userCampaigns.map((data, index) => {
									// console.log(data)
									return (
										<Col key={uuid()}>
											<CardItem
												title={data.title}
												imageHash={data.imageHash}
												address={data.addr}
												showProgress={false}
												goalAmount={data.goalAmount}
												category={data.category}
												description={data.description}
												isActive={data.status}
											/>

											<Divider />
										</Col>
									)
								})}
						</Row>
						<br />
						<br />
					</TabPane>
					<TabPane
						tab={
							<span>
								<TransactionOutlined />
								Your Transactions
							</span>
						}
						key='2'
					>
						<Table dataSource={dataSource} columns={columns} />;
						{/* <pre>
							{user && JSON.stringify(userTransactions, null, 6)}
						</pre> */}
					</TabPane>
				</Tabs>
			</Container>
		</Layout>
	)
}

export default UserProfile
