import styled from 'styled-components'
import { motion } from 'framer-motion'
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
export const Title = styled(motion.p)`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#294859')};
	font-weight: 200;
	font-size: 2.75rem;
	margin-bottom: 0.5rem;

	@media (max-width: 1025px) {
		font-size: 2.15rem;
		margin-bottom: 0.4rem;
	}
	@media (max-width: 800px) {
		font-size: 1.85rem;
		margin-bottom: 0.2rem;
	}
`
export const SubTitle = styled(motion.p)`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#698598')};
	font-weight: 200;
	font-size: 1.1rem;
	@media (max-width: 800px) {
		font-size: 1rem;
	}
	@media (max-width: 623px) {
		font-size: 0.9rem;
	}
`
export const SubSubTitle = styled(motion.p)`
	color: ${({ variant }) => (variant === 'white' ? '#fff' : '#698598')};
	font-weight: 200;
	font-size: 0.85rem;
	@media (max-width: 800px) {
		font-size: 0.8rem;
	}
`
export const ButtonDiv = styled.div`
	margin-top: 4.5rem;
	@media (max-width: 650px) {
		margin-top: 3.25rem;
	}
	@media (max-width: 446px) {
		margin-top: 1rem;
	}
`
