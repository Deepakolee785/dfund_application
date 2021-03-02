import React from 'react'
import { HeaderContainer } from './style'

const Header = ({ heading }) => {
	return (
		<HeaderContainer>
			<h1>{heading} </h1>
		</HeaderContainer>
	)
}

export default Header
