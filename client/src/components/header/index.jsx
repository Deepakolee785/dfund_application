import React from 'react'
import { HeaderContainer } from './style'

const Header = ({ heading, subHeading }) => {
	return (
		<HeaderContainer>
			<h1>{heading} </h1>
			<p>{subHeading}</p>
		</HeaderContainer>
	)
}

export default Header
