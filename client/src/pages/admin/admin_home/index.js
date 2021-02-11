import React, { useState } from 'react'
import { Layout, Menu, Avatar } from 'antd'
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	// DownCircleFilled,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const AdminHome = () => {
	const [collapsed, setCollapsed] = useState(false)
	const toggle = () => {
		setCollapsed(!collapsed)
	}
	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<h1
						className='logo'
						style={{
							height: '50px',
							margin: '16px',
							// background: 'rgba(255, 255, 255, 0.3)',
							color: '#fff',
						}}
					>
						DFund
					</h1>
					<Menu
						theme='dark'
						mode='inline'
						defaultSelectedKeys={['1']}
					>
						<Menu.Item key='1' icon={<UserOutlined />}>
							nav 1
						</Menu.Item>
						<Menu.Item key='2' icon={<VideoCameraOutlined />}>
							nav 2
						</Menu.Item>
						<Menu.Item key='3' icon={<UploadOutlined />}>
							nav 3
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Header
						className='site-layout-background'
						style={{ padding: 0 }}
					>
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								className: 'trigger',
								onClick: toggle,
							}
						)}
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
						Content
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default AdminHome
