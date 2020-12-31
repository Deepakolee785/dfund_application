import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import FactoryContext from '../../context/factory/factoryContext.js'
import { useMutation } from 'react-query'
import axios from 'axios'
import { DEV_URL } from '../../config'

const LoginPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)

	const login = useMutation(data => {
		return axios.post(`${DEV_URL}/api/user/login`, data).then(res => {
			console.log(res)
			return res.data
		})
	})

	console.log(login)
	useEffect(() => {
		form.setFieldsValue({
			wallet: accounts[0],
		})
	}, [accounts, form])

	const onFinish = values => {
		console.log('Success:', values)
		login.mutate(values)
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
							message: 'Please input your username!',
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

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Login
					</Button>
				</Form.Item>
				<p>
					Didn't have an Dfund account?
					<Link to='/register'>Register</Link>
				</p>
				<pre style={{ width: '30rem' }}>
					{login.error &&
						JSON.stringify(login.error.response.data, null, 2)}
				</pre>
				<pre style={{ width: '30rem' }}>
					{login.data && JSON.stringify(login.data, null, 2)}
				</pre>
			</Form>
		</div>
	)
}

export default LoginPage
