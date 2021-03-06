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

const Dashboard = () => {
	const { isAuthenticated, loading } = useContext(AdminAuthContext)
	const [details, setDetails] = useState({})
	useEffect(() => {
		if (isAuthenticated && !loading) {
			getDashboardDetails()
				.then(data => {
					data && setDetails(data.stats)
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
						<DashboardItem color='#E91E63'>
							<VideoCameraAddOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Campaigns</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={transactions} overflowCount={9999}>
						<DashboardItem color='#9C27B0'>
							<TransactionOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Transactions</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={users} overflowCount={9999}>
						<DashboardItem color='#673AB7'>
							<UserOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Users</p>
						</DashboardItem>
					</Badge>
				</Col>
				<Col>
					<Badge count={admins} overflowCount={9999}>
						<DashboardItem color='#00A10C'>
							<LockOutlined
								style={{ fontSize: '2.2rem', color: '#fff' }}
							/>
							<p>Admin</p>
						</DashboardItem>
					</Badge>
				</Col>
			</Row>
		</div>
	)
}

export default Dashboard
