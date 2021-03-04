import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import PageNotFound from '../../assets/images/page_not_found.svg'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button'

const HowItWorks = () => {
	return (
		<Layout>
			<Header heading='How it works?' />
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

export default HowItWorks
