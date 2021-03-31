import styled from 'styled-components'
import { Button } from '../button'

export const NavComponent = styled.div`
	border-bottom: 1px solid #cccde7;
	background-color: #fefefe;
`

export const NavContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	justify-items: center;
	height: 4.5rem;

	@media (max-width: 1148px) {
		width: 90%;
	}
	@media (max-width: 990px) {
		width: 95%;
		.logo_img {
			height: 3rem;
		}
	}
`
export const NavMenuList = styled.ul`
	display: flex;
	gap: 2rem;
	list-style-type: none;
	margin-top: 0.75rem;
	@media (max-width: 990px) {
		display: none;
	}
`

export const MenuTitle = styled.p`
	font-weight: 500;
	font-size: 1rem;
	/* margin-right: 7rem; */
	margin-bottom: 0px;
`
export const SubTitle = styled.p`
	font-size: 0.75rem;
	color: rgb(172, 172, 172);
	margin-top: -2px;
	font-weight: 500;
	margin-left: 1.4rem;
`
export const HamburgerButton = styled(Button)`
	margin-right: 1rem;

	@media (min-width: 990px) {
		display: none;
	}
`
export const AuthButtons = styled.span`
	@media (max-width: 990px) {
		display: none;
	}
`
export const MobileMenu = styled.div`
	@media (min-width: 990px) {
		display: none;
	}
`
export const MobileNavMenuList = styled.ul`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	gap: 0.5rem;
	list-style-type: none;
	margin-top: 0.75rem;
	margin-left: -2rem;
`
