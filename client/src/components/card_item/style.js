import styled from 'styled-components'

export const Category = styled.h4`
	font-weight: 400;
	font-size: 12px;
	line-height: 23px;
	/* identical to box height */

	letter-spacing: 0.02em;

	color: #868686;
`
export const Title = styled.h3`
	font-weight: 500;
	font-size: 17px;
	line-height: 10px;
	letter-spacing: -0.035em;
	color: #000000;
`
export const Amount = styled.h3`
	font-weight: 500;
	font-size: 13px;
	/* line-height: 42px; */
	/* identical to box height */

	letter-spacing: -0.035em;

	color: rgba(0, 0, 0, 0.64);
	margin-bottom: -0.2rem;
`
export const Description = styled.p`
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	letter-spacing: 0.02em;
	color: rgba(0, 0, 0, 0.65);
	/* height: 40px; */
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`
