import { DatePicker, Input, InputNumber, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import styled from 'styled-components'

export const FormDiv = styled.div`
	width: 80%;
	margin: 0 auto;
`

export const Label = styled.label`
	font-style: normal;
	font-weight: 600;
	font-size: 22px;
	line-height: 33px;
	/* identical to box height */

	text-transform: uppercase;

	color: rgba(0, 0, 0, 0.71);
`
export const InputEl = styled(Input)`
	padding: 0;
	&.ant-input {
		border: 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.24);
	}
	&.ant-input:hover,
	&.ant-input:focus,
	&.ant-input:active {
		border: 0;
		outline: none;
		box-shadow: none;
		border-bottom: 2px solid #5f66f1;
	}
`
export const InputNumberEl = styled(InputNumber)`
	width: 100%;
	.ant-input-number-input {
		padding: 0;
	}
	&.ant-input-number {
		border: 0;
		outline: none !important;
		border-bottom: 2px solid rgba(0, 0, 0, 0.24);
	}
	&.ant-input-number:hover,
	&.ant-input-number-focused,
	&.ant-input-number:active {
		border: 0;
		outline: none;
		box-shadow: none;
		border-bottom: 2px solid #5f66f1;
	}
`
export const SelectEl = styled(Select)`
	&.ant-select {
		border: 0;
		outline: none !important;
		/* border-bottom: 2px solid rgba(0, 0, 0, 0.24); */
	}
`
export const TextAreaEl = styled(TextArea)`
	padding: 0;
	&.ant-input {
		border: 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.24);
	}
	&.ant-input:hover,
	&.ant-input:focus,
	&.ant-input:active {
		border: 0;
		outline: none;
		box-shadow: none;
		border-bottom: 2px solid #5f66f1;
	}
`

export const DatePickerEl = styled(DatePicker)`
	padding: 0;
	&.ant-picker {
		border: 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.24);
	}
	&.ant-picker:hover,
	&.ant-picker:focus,
	&.ant-picker:active {
		border: 0;
		outline: none;
		box-shadow: none;
		border-bottom: 2px solid #5f66f1;
	}
`

export const SubText = styled.p`
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 14px;
	letter-spacing: 0.02em;
	/* margin-top: -1.2rem; */
	color: rgba(0, 0, 0, 0.32);
`
