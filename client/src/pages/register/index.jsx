import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import FactoryContext from '../../context/factory/factoryContext.js'

import { useMutation } from 'react-query'
import axios from 'axios'
import { DEV_URL } from '../../config'

const RegisterPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)

	const register = useMutation(data => {
		return axios.post(`${DEV_URL}/api/user/register`, data).then(res => {
			console.log(res)
			return res.data
		})
	})

	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	}, [accounts, form])

	const onFinish = values => {
		console.log('Success:', values)
		register.mutate(values)
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}
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
					<Button
						type='primary'
						htmlType='submit'
						loading={register.isLoading}
					>
						Register
					</Button>
				</Form.Item>

				{console.log('register data', register)}
				<p>
					Already have an Dfund account?<Link to='/login'>Login</Link>
				</p>
				<pre style={{ width: '30rem' }}>
					{register.error &&
						JSON.stringify(register.error.response.data, null, 2)}
				</pre>

				<pre style={{ width: '30rem' }}>
					{register.data && JSON.stringify(register.data, null, 2)}
				</pre>
			</Form>
		</div>
	)
}

export default RegisterPage
