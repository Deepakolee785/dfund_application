import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AuthContext from '../../context/auth/authContext'

import { Button } from '../button'

import logo from '../../assets/images/Logo.svg'
import user_icon from '../../assets/images/user_icon.svg'
import { NavContainer, NavMenuList } from './style'

const Navbar = () => {
	const { isAuthenticated, logout } = useContext(AuthContext)
	// const [showMenu, setShowMenu] = useState(false)
	// const toggleMenu = () => setShowMenu(!showMenu)

	const menu = (
		<Menu>
			<Menu.Item key='0'>
				<Button
					type='primary'
					danger
					onClick={() => {
						logout()
					}}
				>
					Logout
				</Button>
			</Menu.Item>
		</Menu>
	)
	return (
		<NavContainer>
			<img src={logo} alt='Dfund' />
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
						to='/404'
						className='inactiveNav'
						exact
						activeClassName='activeNav'
					>
						Search
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/405'
						className='inactiveNav'
						exact
						activeClassName='activeNav'
					>
						How it works?
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/406'
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
							<Button variant='default' className='outline_btn'>
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
	)
}

export default Navbar
