import React, { Fragment, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import HeaderBottom from '../../components/header_bottom'

import HeroSection from '../../components/hero_section'
import { loadAuthUser } from '../../api/loadUser'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
	const { loadUser } = useContext(AuthContext)

	const authUser = useQuery(['auth_user'], () => loadAuthUser(), {
		// enabled: !!contract,
		onSuccess: data => {
			loadUser(data)
		},
		// retry: false,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		authUser.refetch()
		// eslint-disable-next-line
	}, [])
	return (
		<Fragment>
			<HeroSection />
			<HeaderBottom />
		</Fragment>
	)
}

export default Home
