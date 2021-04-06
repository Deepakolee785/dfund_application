import React, { useState, useEffect, useContext } from 'react'

import { Layout, Menu, Avatar, Dropdown, Divider } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraAddOutlined,
	LockOutlined,
	DashboardOutlined,
	TransactionOutlined,
} from '@ant-design/icons'

import logo from '../../../assets/images/logo_initial.svg'
import Dashboard from './dashboard'
import Campaings from './Campaings'
import Transaction from './Transaction'
import Users from './Users'
import Admin from './Admin'

import AdminAuthContext from '../../../context/admin_auth/adminAuthContext'
import { MenuTitle, SubTitle } from '../../../components/Navbar/style'
import { Button } from '../../../components/button'

const { Header, Sider, Content } = Layout

const AdminHome = () => {
	const { logout, user, loadUser: loadAdmin } = useContext(AdminAuthContext)
	const [selectedMenuIndex, setSelectedMenuIndex] = useState('1')
	const [collapsed, setCollapsed] = useState(false)

	const changeSelectedIndex = index => setSelectedMenuIndex(index)
	const toggle = () => {
		setCollapsed(!collapsed)
	}

	useEffect(() => {
		loadAdmin()
		// eslint-disable-next-line
	}, [])

	const getContent = () => {
		switch (selectedMenuIndex) {
			case '1':
				return <Dashboard changeSelectedIndex={changeSelectedIndex} />
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

	const menu = (
		// <Menu>
		// 	<strong style={{ margin: '1rem' }}>Admin</strong>
		// 	{/* <Menu.Item key='0'>admin</Menu.Item> */}

		// 	<Menu.Divider />
		// 	<Menu.Item key='2'>
		// 		<Button type='text' danger onClick={logout}>
		// 			Logout
		// 		</Button>
		// 	</Menu.Item>
		// </Menu>

		<Menu
			style={{
				width: '240px',
				marginTop: '0.85rem',
				padding: '1rem',
			}}
		>
			<MenuTitle>
				<UserOutlined /> {user && user.name}
			</MenuTitle>
			<SubTitle>{user && user.email}</SubTitle>
			<Divider style={{ margin: '5px 0', marginBottom: '1rem' }} />

			<Button
				type='primary'
				variant='primary'
				style={{ background: '#E64560' }}
				onClick={logout}
				block
			>
				Logout
			</Button>
		</Menu>
	)

	return (
		<div style={{}}>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					{/* <h1
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
						Dfund 
					</h1> */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img
							src={logo}
							alt=''
							style={{
								height: collapsed ? '45px' : '62px',
								marginLeft: !collapsed ? '-1rem' : '',
								marginTop: '1rem',
								marginBottom: '0.5rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								transition: 'all 2s easeInOut',
							}}
						/>
					</div>

					<Menu
						theme='dark'
						mode='inline'
						selectedKeys={[selectedMenuIndex]}
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
					<Header className='site-layout-background' style={{ padding: 0 }}>
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
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						/>

						<span
							style={{
								float: 'right',
								marginRight: '2rem',
								cursor: 'pointer',
							}}
						>
							<Dropdown overlay={menu} trigger={['click']}>
								<Avatar icon={<UserOutlined />} />
							</Dropdown>
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
							overflow: 'auto',
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
