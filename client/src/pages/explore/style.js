import { Card, Select } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
	width: 80%;
	margin: 0 auto;
	/* display: flex;
	align-items: center;
	justify-content: space-between;
	justify-items: center;
	height: 4.5rem; */
`
export const SelectEl = styled(Select)`
	&.ant-select {
		border: 0;
		outline: none !important;
		/* border-bottom: 2px solid rgba(0, 0, 0, 0.54); */
	}
	.ant-select-selection-placeholder {
		font-weight: 500;
		font-size: 14px;
		line-height: 33px;
		letter-spacing: 0.02em;
		color: #9c9797;
	}
`

export const CardEl = styled(Card)`
	width: 292px;
	.ant-card-body {
		padding: 0;
	}
	&.ant-card-bordered {
		border: 1px solid rgba(0, 0, 0, 0.13);
		box-sizing: border-box;
		border-radius: 2px;
	}
`
export const Label = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	/* line-height: 33px; */
	/* identical to box height */

	text-transform: uppercase;

	color: rgba(0, 0, 0, 0.71);
`
