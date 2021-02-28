import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/button'
import PageNotFound from '../../assets/images/page_not_found.svg'
import Layout from '../../layout/user_layout'
const NotFoundPage = () => {
	return (
		<Layout>
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

export default NotFoundPage
