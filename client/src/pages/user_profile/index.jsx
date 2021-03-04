import { useContext, useEffect } from 'react'
import AuthCotext from '../../context/auth/authContext.js'
import { Container } from '../../components/container'
import Layout from '../../layout/user_layout'
const UserProfile = () => {
	const { user, loadUser } = useContext(AuthCotext)
	// console.log(user)

	useEffect(() => {
		loadUser()
		// eslint-disable-next-line
	}, [])
	return (
		<Layout>
			<Container>
				Profile
				{/* <h1>{user && user}</h1> */}
				<pre>{user && JSON.stringify(user, null, 6)}</pre>
			</Container>
		</Layout>
	)
}

export default UserProfile
