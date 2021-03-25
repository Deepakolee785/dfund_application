import styled from 'styled-components'

export const FooterContainer = styled.div`
	margin-top: 3rem;
	height: 20rem;
	background-color: #5f66f1;
	color: #fff;
	position: relative;
	footer {
		padding: 3rem 8rem;
		ul {
			list-style-type: none;
			li {
				font-size: 1rem;
				font-weight: 400;
				line-height: 2rem;
			}
		}
	}
`
export const BottomFooter = styled.div`
	/* background-color: rgba(95, 102, 241, 0); */
	background-color: rgba(0, 0, 0, 0.2);
	position: absolute;
	bottom: 0;
	width: 100%;
	padding-top: 1rem;
	p {
		text-align: center;
		font-weight: 500;
	}
`
