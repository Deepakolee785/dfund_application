import React from 'react'
import { Form, Input } from 'antd'

const InputEl = ({
	label,
	name,
	validationRule,
	placeholder,
	icon,
	disabled,
	isPasswordField = false,
}) => {
	return (
		<div>
			<h4>{label}</h4>
			<div>
				<Form.Item name={name} rules={validationRule}>
					{isPasswordField ? (
						<Input.Password
							placeholder='Password'
							prefix={
								<img
									src={icon}
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
					) : (
						<Input
							disabled={disabled}
							placeholder={placeholder}
							prefix={
								<img
									src={icon}
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
					)}
				</Form.Item>
			</div>
		</div>
	)
}

export default InputEl
