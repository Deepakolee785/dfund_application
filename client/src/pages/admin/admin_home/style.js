import styled from 'styled-components'

export const DashboardItem = styled.div`
	height: 120px;
	width: 200px;
	border-radius: 0.85rem;
	background-color: ${props => props.color};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	p {
		color: #fff;
		font-weight: 600;
		margin-top: 1.2rem;
	}
`
