import React, { useState, useEffect, useContext } from 'react'
import getDashboardDetails from '../../../api/dashboard'
import { DashboardItem } from './style'
import { Badge, Col, Row } from 'antd'
import {
	UserOutlined,
	VideoCameraAddOutlined,
	LockOutlined,
	TransactionOutlined,
} from '@ant-design/icons'
import AdminAuthContext from '../../../context/admin_auth/adminAuthContext'
import LineChart from './charts/line_chart'
import BarChart from './charts/bar_chart'
import DoughnutChart from './charts/doughnut_chart'
import DoughnutChart2 from './charts/doughnut_chart2'

const Dashboard = ({ changeSelectedIndex }) => {
	const { isAuthenticated, loading } = useContext(AdminAuthContext)
	const [details, setDetails] = useState({})
	const [transactionsData, setTransactionsData] = useState({})
	const [campaignsDetails, setCampaignsDetails] = useState({})
	useEffect(() => {
		if (isAuthenticated && !loading) {
			getDashboardDetails()
				.then(data => {
					data && setDetails(data.stats)
					data && setTransactionsData(data.transactionDetails)
					data && setCampaignsDetails(data.campaignsDetails)
				})
				.catch(err => {
					// console.log(err)
				})
		}
	}, [isAuthenticated, loading])
	// console.log(details)

	const { admins, campaigns, transactions, users } = details

	return (
		<div>
			<Row gutter={[30, 10]}>
				<Col>
					<Badge count={campaigns} overflowCount={9999}>
						<DashboardItem
							// color='#e91e63'
							color='#5f66f1'
							onClick={() => {
								changeSelectedIndex('2')
							}}
							whileHover={{ scale: 1.13 }}
							whileTap={{ scale: 0.9 }}
						>
							<VideoCameraAddOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Campaigns</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={transactions} overflowCount={9999}>
						<DashboardItem
							color='rgb(156, 39, 176)'
							onClick={() => {
								changeSelectedIndex('3')
							}}
							whileHover={{ scale: 1.13 }}
							whileTap={{ scale: 0.9 }}
						>
							<TransactionOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Transactions</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={users} overflowCount={9999}>
						<DashboardItem
							color='#673AB7'
							onClick={() => {
								changeSelectedIndex('4')
							}}
							whileHover={{ scale: 1.13 }}
							whileTap={{ scale: 0.9 }}
						>
							<UserOutlined style={{ fontSize: '2.2rem', color: '#fff' }} />
							<p>Users</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={admins} overflowCount={9999}>
						<DashboardItem
							color='#00A10C'
							onClick={() => {
								changeSelectedIndex('5')
							}}
							whileHover={{ scale: 1.13 }}
							whileTap={{ scale: 0.9 }}
						>
							<LockOutlined style={{ fontSize: '2.2rem', color: '#fff' }} />
							<p>Admin</p>
						</DashboardItem>
					</Badge>
				</Col>
			</Row>
			<Row>
				<Col>
					<BarChart campaignsData={campaignsDetails} />
				</Col>
				<Col>
					<DoughnutChart />
					<DoughnutChart2 />
				</Col>
				<Col>
					<LineChart transactionsData={transactionsData} />
				</Col>
				{/* <Col>
					<DoughnutChart2 />
				</Col> */}
			</Row>
		</div>
	)
}

export default Dashboard
