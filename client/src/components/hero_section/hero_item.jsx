import React, { Fragment } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import { Button } from '../button'
import { HeroContainer, Title, SubSubTitle, SubTitle, ButtonDiv } from './style'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const animateVariant = {
	initial: {
		y: -150,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', damping: 20, stiffness: 300 },
	},
}

const HeroItem = ({
	bgUrl,
	title,
	subTitle,
	subSubTitle,
	buttonType = 'primary',
	overlay,
	backgroundPosition,
	textvariant,
}) => {
	return (
		<Fragment>
			<HeroContainer
				bgUrl={bgUrl}
				overlay={overlay}
				backgroundPosition={backgroundPosition}
			>
				<Title
					variants={animateVariant}
					initial='initial'
					animate='animate'
					variant={textvariant}
				>
					{title}
				</Title>
				<SubTitle
					variants={animateVariant}
					initial='initial'
					animate='animate'
					variant={textvariant}
				>
					{subTitle}
				</SubTitle>
				<SubSubTitle
					variants={animateVariant}
					initial='initial'
					animate='animate'
					variant={textvariant}
				>
					{subSubTitle}
				</SubSubTitle>
				<ButtonDiv>
					<motion.div
						variants={animateVariant}
						initial='initial'
						animate='animate'
					>
						<Link to='/create/campaign'>
							<Button
								type={'primary'}
								icon={<PlusOutlined />}
								style={{ marginRight: '1rem' }}
								variant='primary'
							>
								Create a Dfund
							</Button>
						</Link>
						{buttonType === 'secondary' ? (
							<Link to='/explore'>
								<Button variant='default' className='outline_btn transparent'>
									Explore
								</Button>
							</Link>
						) : (
							<Link to='/explore'>
								<Button variant='default' className='outline_btn'>
									Explore
								</Button>
							</Link>
						)}
					</motion.div>
				</ButtonDiv>
			</HeroContainer>
		</Fragment>
	)
}

export default HeroItem
