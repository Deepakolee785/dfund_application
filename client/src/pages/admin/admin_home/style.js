import { Tooltip } from 'antd'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ROPSTEN_ETHERSCAN_URL } from '../../../config'

export const DashboardItem = styled(motion.div)`
	height: 120px;
	width: 200px;
	border-radius: 0.85rem;
	background-color: ${props => props.color};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	cursor: pointer;
	p {
		color: #fff;
		font-weight: 600;
		margin-top: 1.2rem;
	}
`
export const LinkLabel = styled.p`
	width: 5rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color: #1890ff;
`
export const AddressLink = ({ addr }) => (
	<Tooltip title={addr}>
		<a
			href={`${ROPSTEN_ETHERSCAN_URL}/${addr}`}
			target='_blank'
			rel='noopener noreferrer'
		>
			<LinkLabel>{addr}</LinkLabel>
		</a>
	</Tooltip>
)

export const DescriptionLable = styled.p`
	width: 8rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`
export const Description = ({ description }) => (
	<Tooltip title={description}>
		<DescriptionLable>{description}</DescriptionLable>
	</Tooltip>
)
