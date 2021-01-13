import React, { useEffect, useContext } from 'react'
import { Form, Input, Button, message } from 'antd'
import FactoryContext from '../../context/factory/factoryContext'
import AuthContext from '../../context/auth/authContext'
import history from '../../utils/history'

const RegisterPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)
	const { register, loading, success, error } = useContext(AuthContext)

	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	}, [accounts, form])

	const onFinish = values => {
		console.log('Success:', values)
		register(values)
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
			history.push('/login')
		}
	}, [success])

	return (
		<div style={{ height: '70vh' }} className='Center'>
			<Form
				// {...layout}
				name='basic'
				form={form}
				initialValues={{}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Your Wallet'
					name='wallet'
					rules={[
						{
							required: true,
							message: 'You need to have your wallet!',
						},
					]}
				>
					<Input disabled />
				</Form.Item>
				<Form.Item
					label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Email'
					name='email'
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label='Country'
					name='country'
					rules={[
						{
							required: true,
							message: 'Please input your country!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Profile Picture'
					name='imageHash'
					rules={[
						{
							required: false,
							message: 'Please input your country!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' loading={loading}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default RegisterPage
