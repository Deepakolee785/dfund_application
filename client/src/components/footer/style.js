import styled from 'styled-components'

export const FooterContainer = styled.div`
	margin-top: 3rem;
	min-height: 18rem;
	background-color: #5f66f1;
	color: #fff;
	position: relative;
	footer {
		padding: 3rem 8rem;
		h3 {
			color: inherit;
			margin-left: 2.3rem;
			font-size: 1.2rem;
			font-weight: 600;
			&::after {
				content: '';
				display: block;
				padding: 1px;
				width: 0.8rem;
				background-color: #fff;
			}
		}
		ul {
			list-style-type: none;
			li {
				font-size: 0.85rem;
				font-weight: 400;
				line-height: 1.5rem;
				opacity: 0.85;
				a {
					color: inherit;
				}
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
