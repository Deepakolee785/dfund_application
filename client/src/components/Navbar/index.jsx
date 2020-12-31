import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import logo from '../../assets/images/Logo.svg'
import user_icon from '../../assets/images/user_icon.svg'

const Navbar = () => {
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
				<li
					style={{
						fontWeight: 600,
						color: '#5F66F1',
						textShadow: '1px 1.3px #BEC0E7',
					}}
				>
					Home
				</li>
				<li>Explore</li>
				<li>Search</li>
				<li>How it works?</li>
				<li>About</li>
			</ul>

			<div>
				<Link to='/factory'>
					<Button
						type={'primary'}
						icon={<PlusOutlined />}
						style={{
							marginRight: '1rem',
							background: '#5F66F1',
							border: 0,
							borderRadius: '5px',
							height: '2.4rem',
						}}
					>
						Create a Dfund
					</Button>
				</Link>
				<Link to='/login'>
					<Button
						style={{
							width: '130px',
							marginRight: '1rem',
							borderRadius: '5px',
							height: '2.4rem',
							border: '1px solid #5F66F1',
							color: '#5F66F1',
						}}
					>
						Login
					</Button>
				</Link>

				<img src={user_icon} alt='user' />
			</div>
		</div>
	)
}

export default Navbar
