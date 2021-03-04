import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import { Button } from '../../components/button'
import { Link } from 'react-router-dom'
import PageNotFound from '../../assets/images/page_not_found.svg'

const About = () => {
	return (
		<Layout>
			<Header heading='About' />
			<div className='Center' style={{ minHeight: '70vh' }}>
				<img
					src={PageNotFound}
					alt='Page Not Found'
					style={{ marginBottom: '2rem', width: '25rem' }}
				/>
				<Link to='/'>
					<Button type='primary' variant='primary'>
						Home
					</Button>
				</Link>
			</div>
		</Layout>
	)
}

export default About
