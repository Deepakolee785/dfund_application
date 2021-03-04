import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Dropdown, Divider, Row, Col } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
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
} from './style'

const Navbar = () => {
	const { isAuthenticated, logout, user } = useContext(AuthContext)
	// console.log(user)
	// const [showMenu, setShowMenu] = useState(false)
	// const toggleMenu = () => setShowMenu(!showMenu)

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
				<Link to='/'>
					<img src={logo} alt='Dfund' />
				</Link>
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
					<li>
						<NavLink
							to='/search'
							className='inactiveNav'
							exact
							activeClassName='activeNav'
						>
							Search
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
				</NavMenuList>

				<div>
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
								>
									Login
								</Button>
							</Link>
							{/* <Link to='/Register'>
							<Button variant='default' className='outline_btn'>
								Register
							</Button>
						</Link> */}
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
				</div>
			</NavContainer>
		</NavComponent>
	)
}

export default Navbar
