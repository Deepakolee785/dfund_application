import React, { Fragment } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import { Button } from '../button'
import { HeroContainer, Title, SubSubTitle, SubTitle } from './style'
import { Link } from 'react-router-dom'

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
				<Title variant={textvariant}>{title}</Title>
				<SubTitle variant={textvariant}>{subTitle}</SubTitle>
				<SubSubTitle variant={textvariant}>{subSubTitle}</SubSubTitle>
				<br />
				<br />
				<div>
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
							<Button
								variant='default'
								className='outline_btn transparent'
							>
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
				</div>
			</HeroContainer>
		</Fragment>
	)
}

export default HeroItem
