import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Dropdown, Divider, Row, Col, Drawer } from 'antd'
import { PlusOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import AuthContext from '../../context/auth/authContext'

import { Button } from '../button'

import logo from '../../assets/images/Logo.svg'
import user_icon from '../../assets/images/user_icon.svg'
import {
	MenuTitle,
	NavComponent,
	NavContainer,
	NavMenuList,
	SubTitle,
	// HamburgerButton,
	MobileNavMenuList,
	AuthButtons,
	MobileMenu,
} from './style'

const Navbar = () => {
	const { isAuthenticated, logout, user } = useContext(AuthContext)
	// console.log(user)
	// const [showMenu, setShowMenu] = useState(false)
	// const toggleMenu = () => setShowMenu(!showMenu)
	const [visible, setVisible] = useState(false)
	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	const menu = (
		<Menu
			style={{
				width: '240px',
				marginTop: '0.85rem',
				padding: '1rem',
			}}
		>
			<MenuTitle>
				<UserOutlined /> {user && user.username}
			</MenuTitle>
			<SubTitle>{user && user.email}</SubTitle>
			<Divider style={{ margin: '5px 0', marginBottom: '1rem' }} />
			<Row justify='space-between' gutter={[10, 10]}>
				<Col>
					<Button
						type='primary'
						variant='primary'
						style={{ background: '#E64560' }}
						onClick={logout}
					>
						Logout
					</Button>
				</Col>
				<Col>
					<Link to='/profile'>
						<Button type='primary' variant='primary'>
							Go to Profile
						</Button>
					</Link>
				</Col>
			</Row>
		</Menu>
	)
	return (
		<NavComponent>
			<NavContainer>
				<>
					<Link to='/'>
						<img src={logo} alt='Dfund' className='logo_img' />
					</Link>
				</>
				<NavMenuList>
					<li>
						<NavLink
							to='/'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/explore'
							className='inactiveNav'
							activeClassName='activeNav'
						>
							Explore
						</NavLink>
					</li>
					{/* <li>
						<NavLink
							to='/search'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							Search
						</NavLink>
					</li> */}
					<li>
						<NavLink
							to='/how_it_works'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							How it works?
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/about'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/contact'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							Contact
						</NavLink>
					</li>
				</NavMenuList>

				<MobileMenu>
					<Link to='/create/campaign'>
						<Button
							type={'primary'}
							variant='primary'
							icon={<PlusOutlined />}
							style={{ marginRight: '0.65rem' }}
						>
							Create a Dfund
						</Button>
					</Link>
					<Button
						type='primary'
						shape='circle'
						icon={<MenuOutlined />}
						size='large'
						variant='primary'
						onClick={showDrawer}
					/>
					<Drawer
						placement='right'
						closable={false}
						onClose={onClose}
						visible={visible}
					>
						<MobileNavMenuList>
							<li>
								<NavLink
									to='/'
									className='inactiveNav'
									exact
									activeClassName='activeNav'
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/explore'
									className='inactiveNav'
									activeClassName='activeNav'
								>
									Explore
								</NavLink>
							</li>

							<li>
								<NavLink
									to='/how_it_works'
									className='inactiveNav'
									exact
									activeClassName='activeNav'
								>
									How it works?
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/about'
									className='inactiveNav'
									exact
									activeClassName='activeNav'
								>
									About
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/contact'
									className='inactiveNav'
									exact
									activeClassName='activeNav'
								>
									Contact
								</NavLink>
							</li>
						</MobileNavMenuList>
						<Link to='/create/campaign'>
							<Button
								type={'primary'}
								variant='primary'
								icon={<PlusOutlined />}
								style={{ marginRight: '0.65rem' }}
							>
								Create a Dfund
							</Button>
						</Link>

						{!isAuthenticated ? (
							<>
								<Link to='/login'>
									<Button
										variant='default'
										className='outline_btn'
										style={{
											marginRight: '0rem',
											marginTop: '1rem',
										}}
									>
										Login
									</Button>
								</Link>
								<Divider
									type='vertical'
									style={{ height: '2rem' }}
								/>
								<Link to='/Register'>
									<Button
										variant='default'
										type='text'
										style={{ marginLeft: '-1rem' }}
										// className='outline_btn'
									>
										Register
									</Button>
								</Link>
							</>
						) : (
							<Dropdown overlay={menu} trigger={['click']}>
								<img
									src={user_icon}
									alt='user'
									style={{ cursor: 'pointer' }}
								/>
							</Dropdown>
						)}
					</Drawer>
				</MobileMenu>

				<AuthButtons>
					<Link to='/create/campaign'>
						<Button
							type={'primary'}
							variant='primary'
							icon={<PlusOutlined />}
							style={{ marginRight: '0.65rem' }}
						>
							Create a Dfund
						</Button>
					</Link>
					{!isAuthenticated ? (
						<>
							<Link to='/login'>
								<Button
									variant='default'
									className='outline_btn'
									style={{ marginRight: '0rem' }}
								>
									Login
								</Button>
							</Link>
							<Divider
								type='vertical'
								style={{ height: '2rem' }}
							/>
							<Link to='/register'>
								<Button
									variant='default'
									type='text'
									style={{ marginLeft: '-1rem' }}
									// className='outline_btn'
								>
									Register
								</Button>
							</Link>
						</>
					) : (
						<Dropdown overlay={menu} trigger={['click']}>
							<img
								src={user_icon}
								alt='user'
								style={{ cursor: 'pointer' }}
							/>
						</Dropdown>
					)}
				</AuthButtons>
			</NavContainer>
		</NavComponent>
	)
}

export default Navbar
