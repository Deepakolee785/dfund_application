import React, { Fragment } from 'react'
import { Button as AntButton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Button } from '../button'
import { HeroContainer, Title, SubSubTitle, SubTitle } from './style'

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
					<Button
						type={'primary'}
						icon={<PlusOutlined />}
						style={{ marginRight: '1rem' }}
					>
						Create a Dfund
					</Button>
					{buttonType === 'secondary' ? (
						<AntButton
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
						</AntButton>
					) : (
						<AntButton
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
						</AntButton>
					)}
				</div>
			</HeroContainer>
		</Fragment>
	)
}

export default HeroItem
