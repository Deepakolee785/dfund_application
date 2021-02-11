import React, { useEffect, useContext } from 'react'

import { Form, Input, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'

import AdminAuthContext from '../../../context/admin_auth/adminAuthContext'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
}
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
}
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
		<div className='Center' style={{ height: '60vh' }}>
			<h3>Admin Login</h3>
			<Form
				{...layout}
				name='basic'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
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

				<Form.Item {...tailLayout}>
					<Button type='primary' htmlType='submit' loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AdminLogin
