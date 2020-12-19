import React, { Fragment } from 'react'
import { Carousel } from 'antd'

import HeroItem from './hero_item'

import hero_img1 from '../../assets/images/hero_img_bg.svg'
import hero_img2 from '../../assets/images/hero-repeat-img.svg'
import hero_img3 from '../../assets/images/new.svg'

const HeroSection = () => {
	return (
		<Fragment>
			<Carousel effect='fade' autoplay autoplaySpeed={5000}>
				<div>
					<HeroItem
						backgroundPosition='bottom'
						bgUrl={hero_img1}
						overlay={false}
						title='A leading decentralized crowdfunding platform'
						subTitle='Giving a chance to innovation. Helping thousands of
                            people all over the world'
						subSubTitle='Start your Dfund campaign today and see your dream
							turn into reality.'
					/>
				</div>

				<div>
					<HeroItem
						buttonType='secondary'
						textvariant='white'
						overlay={true}
						backgroundPosition='bottom'
						bgUrl={hero_img2}
						title='Fundraising for the people and causes you care about'
						subTitle='Helping everyone, With everyone. No platform fee .
							Reach a worldwide audience'
						subSubTitle='Start your Dfund campaign today or contribute in
							other campaigns.'
					/>
				</div>

				<div>
					<HeroItem
						overlay={true}
						backgroundPosition='center'
						bgUrl={hero_img3}
						title='Contribute in campaign using Ethereum smart contract'
						subTitle='Control your contribution spending by being approver
							of campaign'
						subSubTitle='Start your Dfund campaign today to be the part of
							changing world.'
					/>
				</div>
			</Carousel>
		</Fragment>
	)
}

export default HeroSection
