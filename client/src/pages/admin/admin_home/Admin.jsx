import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserAddOutlined } from '@ant-design/icons'
import { Modal, Form, Input, message } from 'antd'
import { DEV_URL } from '../../../config'
import Table from '../../../components/table'
import { Button } from '../../../components/button'
import { registerAdmin } from '../../../api/admin'

const Admin = () => {
	const [admins, setAdmins] = useState([])
	const [loading, setLoading] = useState(false)
	const [registeringAdmin, setRegisteringAdmin] = useState(false)
	const [refetchAdminData, setRefetchAdminData] = useState(false)

	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}

	useEffect(() => {
		setLoading(true)
		axios
			.get(`${DEV_URL}/api/admin/get-all-admins`)
			.then(res => {
				// console.log(res.data)
				setAdmins(res.data.admins)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => setLoading(false))
	}, [refetchAdminData])

	// console.log(admins)

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},

		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
	]

	const dataSource = admins.map(admin => {
		const { _id: id, name, email } = admin

		return {
			key: id,
			email,
			name,
		}
	})

	const onFinish = ({ name, email, password }) => {
		setRegisteringAdmin(true)
		registerAdmin({ name, email, password })
			.then(res => {
				console.log(res.data)
				message.success(res.data.message)
				handleCancel()
				//regetch data
				setRefetchAdminData(true)
			})
			.catch(err => {
				err.response
					? message.error(err.response.data.message)
					: message.error('Error registering! Try Again!')
			})
			.finally(() => setRegisteringAdmin(false))
	}

	return (
		<>
			<div>
				<Button
					type='primary'
					icon={<UserAddOutlined />}
					style={{ float: 'right' }}
					onClick={showModal}
				>
					Add Another Admin
				</Button>
				<br />

				<Table
					heading='All Admins'
					loading={loading}
					columns={columns}
					dataSource={dataSource}
				/>
			</div>
			<Modal
				title='Add Another Admin'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form onFinish={onFinish}>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please enter the Name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email Address'
						name='email'
						rules={[
							{
								required: true,
								message: 'Please enter the Name!',
							},
							{
								type: 'email',
								message: 'Please enter valid email',
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
								message: 'Password is required',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							block
							loading={registeringAdmin}
						>
							Register new Admin!
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default Admin
