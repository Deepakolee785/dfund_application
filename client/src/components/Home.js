import React, { Fragment } from 'react'
import { Carousel, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Navbar from './Navbar'
import hero_img_bg from '../assets/images/hero_img_bg.svg'
import hero_repeat_img from '../assets/images/hero-repeat-img.svg'
import image1 from '../assets/images/new.svg'

const Home = () => {
	const contentStyle1 = {
		height: '80vh',
		width: '100vw',
		// color: '#fff',
		// lineHeight: '160px',
		paddingTop: '4rem',
		textAlign: 'center',
		// background: '#364d79',
		backgroundImage: `url(${hero_img_bg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
	}
	const contentStyle2 = {
		height: '80vh',
		width: '100vw',
		color: '#fff',
		// lineHeight: '160px',
		paddingTop: '4rem',
		textAlign: 'center',
		// background: '#364d79',
		// backgroundImage: `url(${hero_repeat_img})`,
		backgroundImage: ` linear-gradient(0deg, rgba(95, 102, 241, 0.12), rgba(95, 102, 241, 0.12)), url(${hero_repeat_img})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
	}
	const contentStyle3 = {
		height: '80vh',
		// // width: '100vw',
		// color: '#fff',
		// // lineHeight: '160px',
		paddingTop: '1rem',
		textAlign: 'center',
		// // background: '#364d79',
		backgroundImage: `url(${image1})`,
		// // backgroundImage: ` linear-gradient(0deg, rgba(95, 102, 241, 0.12), rgba(95, 102, 241, 0.12)), url(${hero_repeat_img})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}
	return (
		<Fragment>
			<Navbar />
			<Carousel effect='fade' autoplay autoplaySpeed={5000}>
				<div>
					<div style={contentStyle1}>
						<p
							style={{
								color: '#294859',
								fontWeight: 200,
								fontSize: '2.75rem',
								marginBottom: '0.5rem',
							}}
						>
							A leading decentralized crowdfunding platform{' '}
						</p>
						<p
							style={{
								color: '#698598',
								fontWeight: 200,
								fontSize: '1.1rem',
							}}
						>
							Giving a chance to innovation. Helping thousands of
							people all over the world
						</p>
						<p
							style={{
								color: '#698598',
								fontWeight: 200,
								fontSize: '0.85rem',
							}}
						>
							Start your Dfund campaign today and see your dream
							turn into reality.
						</p>
						<br />
						<br />

						<div>
							<Button
								type={'primary'}
								icon={<PlusOutlined />}
								style={{
									marginRight: '1rem',
									background: '#5F66F1',
									border: 0,
									borderRadius: '5px',
									height: '2.4rem',
								}}
							>
								Create a Dfund
							</Button>
							<Button
								style={{
									width: '130px',
									marginRight: '1rem',
									borderRadius: '5px',
									height: '2.4rem',
									border: '1px solid #5F66F1',
									color: '#5F66F1',
								}}
							>
								Explore
							</Button>
						</div>
					</div>
				</div>
				<div>
					<div id='animate-bg' style={contentStyle2}>
						<p
							style={{
								color: '#fff',
								fontWeight: 200,
								fontSize: '2.75rem',
								marginBottom: '0.5rem',
							}}
						>
							Fundraising for the people and causes you care about
						</p>
						<p
							style={{
								color: '#fff',
								fontWeight: 200,
								fontSize: '1.1rem',
							}}
						>
							Helping everyone, With everyone. No platform fee .
							Reach a worldwide audience
						</p>
						<p
							style={{
								color: '#fff',
								fontWeight: 200,
								fontSize: '0.85rem',
							}}
						>
							Start your Dfund campaign today or contribute in
							other campaigns
						</p>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />

						<div>
							<Button
								type={'primary'}
								icon={<PlusOutlined />}
								style={{
									marginRight: '1rem',
									background: '#5F66F1',
									border: 0,
									borderRadius: '5px',
									height: '2.4rem',
								}}
							>
								Create a Dfund
							</Button>
							<Button
								type='ghost'
								style={{
									width: '130px',
									marginRight: '1rem',
									borderRadius: '5px',
									height: '2.4rem',
									border: '1px solid #fff',
									color: '#fff',
								}}
							>
								Explore
							</Button>
						</div>
					</div>
				</div>
				<div>
					<div style={contentStyle3}>
						<p
							style={{
								color: '#294859',
								fontWeight: 200,
								fontSize: '2.65rem',
								marginBottom: '0.5rem',
							}}
						>
							Contribute in campaign using Ethereum smart contract
						</p>
						<p
							style={{
								color: '#4E4E4E',
								fontWeight: 200,
								fontSize: '1.1rem',
							}}
						>
							Control your contribution spending by being approver
							of campaign
						</p>
						<p
							style={{
								color: '#524C4C',
								fontWeight: 200,
								fontSize: '0.85rem',
							}}
						>
							Start your Dfund campaign today to be the part of
							changing world
						</p>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />

						<div>
							<Button
								type={'primary'}
								icon={<PlusOutlined />}
								style={{
									marginRight: '1rem',
									background: '#5F66F1',
									border: 0,
									borderRadius: '5px',
									height: '2.4rem',
								}}
							>
								Create a Dfund
							</Button>
							<Button
								type='ghost'
								style={{
									width: '130px',
									marginRight: '1rem',
									borderRadius: '5px',
									height: '2.4rem',
									border: '1px solid #5F66F1',
									color: '#5F66F1',
								}}
							>
								Explore
							</Button>
						</div>
					</div>
				</div>
			</Carousel>
		</Fragment>
	)
}

export default Home
