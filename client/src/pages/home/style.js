import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled.div`
	width: 84%;
	margin: 0 auto;
`
export const Heading = styled.p`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 33px;
	/* identical to box height */

	/* text-transform: uppercase; */

	/* color: #5f66f1; */
	color: blck;
	&::after {
		content: '';
		display: block;
		padding: 2px;
		margin-top: -2.2px;
		width: 1rem;
		background-color: #5f66f1;
	}
`
export const ImpactSectionDiv = styled.div`
	background-color: #fafafa;
	height: 24rem;
	margin: 7rem 0;
`
export const SectionContainer = styled.div`
	width: 84%;
	margin: 0 auto;
`
export const BadgeLabel = styled(motion.p)`
	width: 10rem;
	padding: 0.5rem 1rem;
	background-color: #5f66f1;
	color: #fff;
	font-weight: bold;
	font-size: 1.1rem;
	letter-spacing: 0.01em;
	border-top-right-radius: 5rem;
	border-bottom-right-radius: 5rem;
`

export const SubHeading = styled.p`
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	letter-spacing: 0.02em;
	color: rgba(0, 0, 0, 0.65);
`
export const BottomSectionDiv = styled.div`
	background-color: #fafafa;
	height: 15rem;
	margin: 7rem 0 -2rem 0;
`
export const BottomHeading = styled.p`
	font-weight: 300;
	font-size: 1.25rem;
	line-height: 42px;
	/* identical to box height */

	letter-spacing: -0.02em;

	color: rgba(0, 0, 0, 0.69);
`
