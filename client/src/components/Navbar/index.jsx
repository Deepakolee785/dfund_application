import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AuthContext from '../../context/auth/authContext'

import { Button } from '../button'

import logo from '../../assets/images/Logo.svg'
import user_icon from '../../assets/images/user_icon.svg'

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
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				justifyItems: 'center',
				borderBottom: '1px solid #CCCDE7',
				height: '4.5rem',
			}}
		>
			<img src={logo} alt='Dfund' />

			<ul
				style={{
					display: 'flex',
					gap: '2rem',
					listStyleType: 'none',
					marginTop: '0.75rem',
				}}
			>
				<NavLink
					to='/'
					exact
					style={
						{
							// fontWeight: 600,
							// color: 'black',
							// textShadow: '1px 1.3px #BEC0E7',
						}
					}
					activeClassName='activeNav'
				>
					<li>Home</li>
				</NavLink>
				<NavLink to='/explore' activeClassName='activeNav'>
					<li>Explore</li>
				</NavLink>
				<li>Search</li>
				<li>How it works?</li>
				<li>About</li>
			</ul>

			<div>
				<Link to='/create/campaign'>
					<Button
						type={'primary'}
						variant='primary'
						icon={<PlusOutlined />}
						// style={{
						// 	marginRight: '1rem',
						// 	background: '#5F66F1',
						// 	border: 0,
						// 	borderRadius: '5px',
						// 	height: '2.4rem',
						// }}
					>
						Create a Dfund
					</Button>
				</Link>
				{!isAuthenticated ? (
					<Link to='/login'>
						<Button
							// style={{
							// 	width: '130px',
							// 	marginRight: '1rem',
							// 	borderRadius: '5px',
							// 	height: '2.4rem',
							// 	border: '1px solid #5F66F1',
							// 	color: '#5F66F1',
							// }}
							variant='default'
							className='outline_btn'
							style={{ marginLeft: '0.75rem' }}
						>
							Login
						</Button>
					</Link>
				) : (
					<>
						{/* <div onClick={toggle}> */}
						<Dropdown overlay={menu} trigger={['click']}>
							<img
								src={user_icon}
								alt='user'
								style={{ cursor: 'pointer' }}
							/>
						</Dropdown>

						{/* <span
							onClick={toggleMenu}
							style={{ cursor: 'pointer' }}
						>
							<img src={user_icon} alt='user' />
						</span>
						<div
							style={{
								border: 'red',
								position: 'absolute',
								top: 60,
								right: 90,
								zIndex: 99,
								display: showMenu ? 'block' : 'none',
							}}
						>
							<Button
								type='primary'
								danger
								onClick={() => {
									logout()
									setShowMenu(false)
								}}
							>
								Logout
							</Button>
						</div> */}
					</>
				)}
			</div>
		</div>
	)
}

export default Navbar
