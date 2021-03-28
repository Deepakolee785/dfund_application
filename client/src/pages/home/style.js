import styled from 'styled-components'
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
