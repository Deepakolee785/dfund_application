import styled from 'styled-components'

export const HeroContainer = styled.div`
	height: 80vh;
	width: 100vw;
	text-align: center;
	background-image: ${({ bgUrl, overlay }) =>
		overlay
			? ` linear-gradient(0deg, rgba(95, 102, 241, 0.12), rgba(95, 102, 241, 0.12)), url(${bgUrl})`
			: `url(${bgUrl})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: ${({ backgroundPosition }) => backgroundPosition};
	padding-top: ${({ backgroundPosition }) =>
		backgroundPosition === 'center' ? '1rem' : '4rem'};
`
export const Title = styled.p`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#294859')};
	font-weight: 200;
	font-size: 2.75rem;
	margin-bottom: 0.5rem;
`
export const SubTitle = styled.p`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#698598')};
	font-weight: 200;
	font-size: 1.1rem;
`
export const SubSubTitle = styled.p`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#698598')};
	font-weight: 200;
	font-size: 0.85rem;
`
