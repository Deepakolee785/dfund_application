import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, message } from 'antd'
import FactoryContext from '../../context/factory/factoryContext.js'
import AuthContext from '../../context/auth/authContext'
import history from '../../utils/history'

import { Button } from '../../components/button'

import wallet_icon from '../../assets/icons/wallet.svg'
import user_icon from '../../assets/icons/user.svg'
import lock_icon from '../../assets/icons/lock.svg'
import Layout from '../../layout/user_layout'
import InputEl from '../../components/input/index.jsx'

const LoginPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)
	const { login, loading, success, error } = useContext(AuthContext)

	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	}, [accounts, form])

	window.ethereum.on('accountsChanged', accounts => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	})

	const onFinish = values => {
		// console.log('Success:', values)
		login(values)
	}

	const onFinishFailed = errorInfo => {
		// console.log('Failed:', errorInfo)
	}

	useEffect(() => {
		if (error) {
			message.error(error)
		}
	}, [error])
	useEffect(() => {
		if (success) {
			message.success(success)
			history.push('/')
		}
	}, [success])

	return (
		<Layout>
			<div style={{ height: '70vh' }} className='Center'>
				<div>
					<h2 style={{ color: '#294859' }}>
						Login to Your Dfund Account
					</h2>
					<br />
					<Form
						// {...layout}
						name='basic'
						form={form}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<InputEl
							label='Your Ethereum walllet'
							name='wallet'
							validationRule={[
								{
									required: true,
									message: 'Wallet is required!',
								},
							]}
							placeholder=''
							icon={wallet_icon}
							disabled={true}
						/>
						<InputEl
							label='Username'
							name='username'
							validationRule={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
							placeholder='Username'
							icon={user_icon}
							disabled={false}
						/>
						<InputEl
							label='Password'
							name='password'
							validationRule={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
							placeholder='Username'
							icon={lock_icon}
							disabled={false}
							isPasswordField={true}
						/>
						{/* <div>

							<h4>Your Ethereum walllet</h4>
							<div>
								<Form.Item
									// label='Your Wallet'
									name='wallet'
									rules={[
										{
											required: true,
											message: 'Wallet is required!',
										},
									]}
								>
									<Input
										disabled
										prefix={
											<img
												src={wallet_icon}
												alt=''
												width='25'
												height='25'
												style={{ marginLeft: '-6px' }}
											/>
										}
										style={{
											height: '2.5rem',
											width: '26rem',
											border:
												'1px solid rgba(0,0,0,0,0.2)',
											borderLeft: '7px solid #5F66F1',
										}}
									/>
								</Form.Item>
							</div>
						</div> */}

						{/* <div>
							<h4>Username</h4>
							<div
								style={
									{
										// borderLeft: '7px solid #5F66F1',
									}
								}
							>
								<Form.Item
									// label='Username'
									name='username'
									rules={[
										{
											required: true,
											message:
												'Please input your username!',
										},
									]}
								>
									<Input
										placeholder='Username'
										prefix={
											<img
												src={user_icon}
												alt=''
												width='25'
												height='25'
												style={{ marginLeft: '-6px' }}
											/>
										}
										style={{
											height: '2.5rem',
											width: '26rem',
											border:
												'1px solid rgba(0,0,0,0,0.2)',
											borderLeft: '7px solid #5F66F1',
										}}
									/>
								</Form.Item>
							</div>
						</div>
						<div>
							<h4>Password</h4>
							<div>
								<Form.Item
									// label='Password'
									name='password'
									rules={[
										{
											required: true,
											message:
												'Please input your password!',
										},
									]}
								>
									<Input.Password
										placeholder='Password'
										prefix={
											<img
												src={lock_icon}
												alt=''
												width='25'
												height='25'
												style={{ marginLeft: '-6px' }}
											/>
										}
										style={{
											height: '2.5rem',
											width: '26rem',
											border:
												'1px solid rgba(0,0,0,0,0.2)',
											borderLeft: '7px solid #5F66F1',
										}}
									/>
								</Form.Item>
							</div>
						</div> */}
						<Form.Item>
							<Button
								type='primary'
								variant='primary'
								htmlType='submit'
								block
								loading={loading}
							>
								Login
							</Button>
						</Form.Item>
						<p>
							Didn't have an Dfund account?{' '}
							<Link to='/register'>
								<strong style={{ textDecoration: 'underline' }}>
									Register
								</strong>
							</Link>
						</p>
					</Form>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage
