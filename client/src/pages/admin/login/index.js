import React, { useEffect, useContext } from 'react'

import { Col, Form, Input, message, Row } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import AdminAuthContext from '../../../context/admin_auth/adminAuthContext'
import { Redirect } from 'react-router-dom'
import { Button } from '../../../components/button'
import { LoginContainer } from './style'
import Logo from '../../../assets/images/logo_initial.svg'
import bg from '../../../assets/images/bg1.svg'
import { AdminLoginPageVariant } from '../../../animation'
import { motion } from 'framer-motion'
import {
	UserOutlined,
	LockOutlined,
	LoginOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons'

const AdminLogin = () => {
	const history = useHistory()
	const {
		loadUser,
		login,
		loading,
		success,
		error,
		isAuthenticated,
	} = useContext(AdminAuthContext)

	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
	}, [])
	const onFinish = values => {
		console.log('Success:', values)
		login(values)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	useEffect(() => {
		if (error) {
			message.error(error)
		}
	}, [error])
	useEffect(() => {
		if (success) {
			message.success(success)
			history.push('/control/home')
		}
		//eslint-disable-next-line
	}, [success])
	if (isAuthenticated) return <Redirect to='/control/home' />
	return (
		<div
			className='Center'
			style={{
				height: '100vh',
			}}
		>
			<Row gutter={[50, 5]}>
				<Col>
					<motion.img
						initial={{
							x: '-30vh',
						}}
						animate={{
							x: 0,
						}}
						transition={{
							type: 'spring',
							damping: 20,
							stiffness: 100,
						}}
						src={bg}
						alt=''
						width='500'
					/>
				</Col>
				<Col></Col>
				<Col>
					<LoginContainer
						variants={AdminLoginPageVariant}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<div className='Center'>
							<img src={Logo} alt='' width='50' />
							<h3 style={{ fontWeight: 600, fontSize: '1.3rem' }}>
								Admin Login
							</h3>
						</div>
						<Form
							name='basic'
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<label htmlFor=''>
								<strong>Email</strong>
							</label>

							<Form.Item
								// label='Email'
								name='email'
								rules={[
									{
										required: true,
										message: 'Please input your email!',
									},
								]}
							>
								<Input
									placeholder='test@email.com'
									prefix={<UserOutlined />}
								/>
							</Form.Item>
							<label htmlFor=''>
								<strong>Password</strong>
							</label>

							<Form.Item
								// label='Password'
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password
									placeholder='******'
									prefix={<LockOutlined />}
								/>
							</Form.Item>

							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									loading={loading}
									block
									variant='primary'
									icon={<LoginOutlined />}
								>
									Admin Login
								</Button>
							</Form.Item>
						</Form>
						<strong className='Center'>or</strong>
						<Link to='/'>
							<Button
								type='link'
								block
								danger
								icon={<ArrowLeftOutlined />}
							>
								Go Back Home
							</Button>
						</Link>
					</LoginContainer>
				</Col>
			</Row>
		</div>
	)
}

export default AdminLogin
