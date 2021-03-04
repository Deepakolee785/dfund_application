import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, message } from 'antd'
import FactoryContext from '../../context/factory/factoryContext.js'
import AuthContext from '../../context/auth/authContext'
import history from '../../utils/history'

import { Button } from '../../components/button'

import wallet_icon from '../../assets/icons/wallet.svg'
import user_icon from '../../assets/icons/user.svg'
import lock_icon from '../../assets/icons/lock.svg'
import Layout from '../../layout/user_layout'
import InputEl from '../../components/input'
import Header from '../../components/header'

const LoginPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)
	const { login, loading, success, error } = useContext(AuthContext)

	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts.length !== 0 ? accounts[0].toLowerCase() : '',
		})
	}, [accounts, form])

	window.ethereum.on('accountsChanged', accounts => {
		form.setFieldsValue({
			wallet: accounts.length !== 0 ? accounts[0].toLowerCase() : '',
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
			<div style={{ minHeight: '70vh' }}>
				<div>
					{/* <h2 style={{ color: '#294859' }}>
						Login to Your Dfund Account
					</h2> */}
					<Header heading='Login to Your Dfund Account' />
					<br />
					<div className='Center'>
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
									<strong
										style={{
											textDecoration: 'underline',
											color: '#5f66f1',
											fontWeight: 500,
										}}
									>
										Register
									</strong>
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage
