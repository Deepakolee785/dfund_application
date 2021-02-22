import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { DEV_URL } from '../../../config'
import { Table } from 'antd'
const Admin = () => {
	const [admins, setAdmins] = useState([])
	const [loading, setLoading] = useState(false)
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
	}, [])

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

	return (
		<div>
			<h3>Admins</h3>
			<Table
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: true }}
				loading={loading}
			/>
		</div>
	)
}

export default Admin
