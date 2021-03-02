import React, { useEffect, useContext, useState } from 'react'
import { Form, message, Input, Spin } from 'antd'
import FactoryContext from '../../context/factory/factoryContext'
import AuthContext from '../../context/auth/authContext'
import history from '../../utils/history'
import Layout from '../../layout/user_layout'
import InputEl from '../../components/input'

import ipfs from '../../services/ipfs'
import { IPFS_INFURA_URL } from '../../config'

import { Button } from '../../components/button'

import wallet_icon from '../../assets/icons/wallet.svg'
import user_icon from '../../assets/icons/user.svg'
import lock_icon from '../../assets/icons/lock.svg'
import email_icon from '../../assets/icons/email.svg'
import location_icon from '../../assets/icons/location.svg'
import image_icon from '../../assets/icons/image.svg'
import { Link } from 'react-router-dom'
import Header from '../../components/header'

const RegisterPage = () => {
	const [form] = Form.useForm()
	const { accounts } = useContext(FactoryContext)
	const { register, loading, success, error } = useContext(AuthContext)

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

	const [imageHash, setImageHash] = useState('')
	const [uploading, setUploading] = useState(false)
	const captureImage = e => {
		setUploading(true)
		const file = e.target.files[0]
		const reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => {
			const bufferArray = Buffer(reader.result)
			console.log('buffer', bufferArray)
			if (bufferArray) {
				ipfs.add(bufferArray)
					.then(result => {
						console.log(result)
						message.success('Uploaded to IPFS')
						return setImageHash(result.path)
					})
					.catch(err => {
						message.err('Error uploading to IPFS')
						console.error(err)
					})
					.finally(() => setUploading(false))
			}
		}
	}

	const onFinish = values => {
		const data = {
			...values,
			imageHash: imageHash,
		}

		register(data)
	}

	const onFinishFailed = errorInfo => {
		// console.log('Failed:', errorInfo)
	}

	return (
		<Layout>
			<div style={{ minHeight: '95vh' }}>
				<div>
					<Header heading='Register into Dfund Network' />
					<br />
					<div className='Center'>
						<Form
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
										message:
											'You need to have your wallet!',
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
								label='Email'
								name='email'
								validationRule={[
									{
										required: true,
										message: 'Please input your email!',
									},
								]}
								placeholder='Email Address'
								icon={email_icon}
								disabled={false}
							/>

							<InputEl
								label='Country'
								name='country'
								validationRule={[
									{
										required: true,
										message: 'Please input your country',
									},
								]}
								placeholder='Country'
								icon={location_icon}
								disabled={false}
							/>

							<div>
								<h4
									style={{
										marginBottom: '0.1rem',
										opacity: 0.85,
									}}
								>
									Profile Picture
								</h4>
								<Form.Item name='imageHash'>
									<Input
										prefix={
											<img
												src={image_icon}
												alt=''
												width='24'
												height='24'
												style={{ marginLeft: '-6px' }}
											/>
										}
										type='file'
										onChange={captureImage}
										style={{
											height: '2.5rem',
											width: '26rem',
											border:
												'1px solid rgba(0,0,0,0,0.2)',
											borderLeft: '7px solid #5F66F1',
										}}
									/>
								</Form.Item>
								{uploading && <Spin />}
								{imageHash !== '' && (
									<img
										src={`${IPFS_INFURA_URL}/${imageHash}`}
										alt=''
										height='100'
										width='100'
									/>
								)}
							</div>

							<InputEl
								label='Password'
								name='password'
								validationRule={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
								placeholder='Password'
								icon={lock_icon}
								disabled={false}
								isPasswordField={true}
							/>

							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									variant='primary'
									block
									loading={loading}
								>
									Register
								</Button>
							</Form.Item>
							<p>
								Already have an Dfund account?{' '}
								<Link to='/login'>
									<strong
										style={{
											textDecoration: 'underline',
											color: '#5f66f1',
											fontWeight: 500,
										}}
									>
										Login
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

export default RegisterPage
