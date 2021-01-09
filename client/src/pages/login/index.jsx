import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import FactoryContext from '../../context/factory/factoryContext.js'
import { useMutation } from 'react-query'
import axios from 'axios'
import { DEV_URL } from '../../config'
import history from '../../utils/history.js'

import wallet_icon from '../../assets/icons/wallet.svg'
import user_icon from '../../assets/icons/user.svg'
import lock_icon from '../../assets/icons/lock.svg'

const LoginPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)

	const login = useMutation(data => {
		return axios.post(`${DEV_URL}/api/user/login`, data).then(res => {
			// console.log(res)
			return res.data
		})
	})

	// console.log(login)
	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	}, [accounts, form])

	const onFinish = values => {
		// console.log('Success:', values)
		login.mutate(values)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	useEffect(() => {
		if (login.isSuccess) {
			message.success('Successfully logged in.')
			localStorage.setItem('token', login.data.token)
			history.push('/')
		}
	}, [login])
	useEffect(() => {
		if (login.isError) {
			// message.error(login.error.response.data.message)
			message.error(login.error.response)
		}
	}, [login])
	return (
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
					initialValues={{}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<div>
						<h4>Your Ethereum walllet</h4>
						<div
							style={
								{
									// borderLeft: '7px solid #5F66F1',
								}
							}
						>
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
										border: '1px solid rgba(0,0,0,0,0.2)',
										borderLeft: '7px solid #5F66F1',
									}}
								/>
							</Form.Item>
						</div>
					</div>
					<div>
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
										message: 'Please input your username!',
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
										border: '1px solid rgba(0,0,0,0,0.2)',
										borderLeft: '7px solid #5F66F1',
									}}
								/>
							</Form.Item>
						</div>
					</div>
					<div>
						<h4>Username</h4>
						<div
							style={
								{
									// borderLeft: '7px solid #5F66F1',
								}
							}
						>
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
										border: '1px solid rgba(0,0,0,0,0.2)',
										borderLeft: '7px solid #5F66F1',
									}}
								/>
							</Form.Item>
						</div>
					</div>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Login
						</Button>
					</Form.Item>
					<p>
						Didn't have an Dfund account?
						<Link to='/register'>Register</Link>
					</p>
					{/* <pre style={{ width: '30rem' }}>
					{login.error &&
						JSON.stringify(login.error.response.data, null, 2)}
				</pre>
				<pre style={{ width: '30rem' }}>
					{login.data && JSON.stringify(login.data, null, 2)}
				</pre> */}
				</Form>
			</div>
		</div>
	)
}

export default LoginPage
