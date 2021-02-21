import React, { useState } from 'react'

import { Layout, Menu, Avatar, Button } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraAddOutlined,
	LockOutlined,
	DashboardOutlined,
	TransactionOutlined,
} from '@ant-design/icons'

// import logo from '../../../assets/images/Logo.svg'
import Dashboard from './dashboard'
import Campaings from './Campaings'
import Transaction from './Transaction'
import Users from './Users'
import Admin from './Admin'

const { Header, Sider, Content } = Layout

const AdminHome = () => {
	const [selectedMenuIndex, setSelectedMenuIndex] = useState('1')

	const [collapsed, setCollapsed] = useState(false)
	const toggle = () => {
		setCollapsed(!collapsed)
	}

	const getContent = () => {
		switch (selectedMenuIndex) {
			case '1':
				return <Dashboard />
			case '2':
				return <Campaings />
			case '3':
				return <Transaction />

			case '4':
				return <Users />

			case '5':
				return <Admin />

			default:
				break
		}
	}
	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<h1
						className='logo'
						style={{
							height: '50px',
							fontSize: !collapsed ? '1.2rem' : '0.95rem',
							marginLeft: '1.5rem',
							paddingTop: '1.5rem',
							fontWeight: !collapsed ? 600 : 500,

							color: '#fff',
						}}
					>
						{/* <img src={logo} alt='' /> */}
						Dfund
					</h1>
					<Menu
						theme='dark'
						mode='inline'
						defaultSelectedKeys={[selectedMenuIndex]}
						onClick={({ item, key, keyPath, domEvent }) => {
							// console.log(key)
							setSelectedMenuIndex(key)
						}}
					>
						<Menu.Item key='1' icon={<DashboardOutlined />}>
							Dashboard
						</Menu.Item>
						<Menu.Item key='2' icon={<VideoCameraAddOutlined />}>
							Campaigns
						</Menu.Item>
						<Menu.Item key='3' icon={<TransactionOutlined />}>
							Transactions
						</Menu.Item>
						<Menu.Item key='4' icon={<UserOutlined />}>
							Users
						</Menu.Item>
						<Menu.Item key='5' icon={<LockOutlined />}>
							Admins
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Header
						className='site-layout-background'
						style={{ padding: 0 }}
					>
						{/* {React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: 'trigger',
								onClick: toggle,
							}
						)} */}
						<Button
							className='trigger'
							onClick={toggle}
							style={{ marginLeft: '0.5rem' }}
							icon={
								collapsed ? (
									<MenuUnfoldOutlined />
								) : (
									<MenuFoldOutlined />
								)
							}
						/>

						<span style={{ float: 'right', marginRight: '2rem' }}>
							<Avatar icon={<UserOutlined />} />
							{/* <DownCircleFilled
								style={{ color: '#ccc', marginLeft: '0.2rem' }}
							/> */}
						</span>
					</Header>
					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						{getContent()}
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default AdminHome
