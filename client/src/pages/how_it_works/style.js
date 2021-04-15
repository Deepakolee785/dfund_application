import styled from 'styled-components'

export const StepsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`
export const NumberLable = styled.p`
	height: 3rem;
	width: 3rem;
	font-size: 2rem;
	font-weight: 800;
	background-color: #5f66f1;
	color: #fff;
	text-align: center;
	border-radius: 50%;
	margin-bottom: 0.5rem;
`
export const Title = styled.h4`
	font-size: 1rem;
	margin: 0.1rem 0;
	margin-left: 0.2rem;
`
export const StepContainer = styled.div`
	ul {
		margin-left: -1rem;
		li {
			line-height: 1.5rem;
		}
	}
`
export const SectionDiv = styled.div`
	background-color: #fafafa;
	height: 24rem;
	margin: 7rem 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	h4 {
		font-size: 2.5rem;
		font-weight: 300;
		opacity: 0.85;
		text-transform: uppercase;
	}
	p {
		font-size: 1.25rem;
		opacity: 0.8;
		font-weight: 500;
	}
`
