import React from 'react'
import { Form, Input, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const InputEl = ({
	label,
	name,
	validationRule,
	placeholder,
	icon,
	disabled,
	isPasswordField = false,
	type = 'text',
}) => {
	return (
		<div style={{ marginBottom: '-0.5rem' }}>
			<h4 style={{ marginBottom: '0.1rem', opacity: 0.85 }}>
				{label}
				{isPasswordField && (
					<Tooltip title='Passwords must have at least 8 characters with one lowercase, uppercase, number, and special character.'>
						<InfoCircleOutlined style={{ marginLeft: '0.3rem' }} />
					</Tooltip>
				)}
			</h4>
			<div>
				<Form.Item
					name={name}
					rules={validationRule}
					tooltip={{
						title: 'Tooltip with customize icon',
						icon: <InfoCircleOutlined />,
					}}
					// label='name'
				>
					{isPasswordField ? (
						<Input.Password
							placeholder='Password'
							prefix={
								<img
									src={icon}
									alt=''
									width='24'
									height='24'
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
					) : (
						<Input
							disabled={disabled}
							placeholder={placeholder}
							type={type}
							prefix={
								<img
									src={icon}
									alt=''
									width='24'
									height='24'
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
					)}
				</Form.Item>
			</div>
		</div>
	)
}

export default InputEl
