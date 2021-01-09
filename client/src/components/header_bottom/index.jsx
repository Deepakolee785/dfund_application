import React from 'react'
import { Row, Col } from 'antd'
import AnimatedNumber from 'animated-number-react'

import Goal1 from '../../assets/images/goal1.svg'
import Goal2 from '../../assets/images/goal2.svg'
import Goal3 from '../../assets/images/goal3.svg'
import Goal4 from '../../assets/images/goal4.svg'

const HeaderBottom = () => {
	const formatValue = value => `${Number(value).toFixed(0)}`
	return (
		<div style={{ margin: '1.25rem 0.5rem' }}>
			<Row justify='space-around'>
				<div>
					<Row align='bottom' justify='space-between'>
						<Col>
							<img src={Goal1} alt='' width='62' height='62' />
						</Col>
						<Col>
							<span style={{ fontWeight: 700, fontSize: '2rem' }}>
								<AnimatedNumber
									value={299}
									formatValue={formatValue}
								/>
							</span>
						</Col>
					</Row>
					<Row>
						<p style={{ color: '#698598' }}>Active Campaigns</p>
					</Row>
				</div>
				<div>
					<Row align='bottom' justify='space-around'>
						<Col>
							<img src={Goal2} alt='' width='62' height='62' />
						</Col>
						<Col>
							<span style={{ fontWeight: 700, fontSize: '2rem' }}>
								<AnimatedNumber
									value={299}
									formatValue={formatValue}
								/>
							</span>
						</Col>
					</Row>
					<Row>
						<p style={{ color: '#698598' }}>Successful campaigns</p>
					</Row>
				</div>
				<div>
					<Row align='bottom' justify='space-between'>
						<Col>
							<img src={Goal3} alt='' width='62' height='62' />
						</Col>
						<Col>
							<span style={{ fontWeight: 700, fontSize: '2rem' }}>
								<AnimatedNumber
									value={299}
									formatValue={formatValue}
								/>{' '}
								{/* <small>ETH</small> */}
							</span>
						</Col>
					</Row>
					<Row>
						<p style={{ color: '#698598' }}>Toal fund collected</p>
					</Row>
				</div>
				<div>
					<Row align='bottom' justify='space-between'>
						<Col>
							<img src={Goal4} alt='' width='62' height='62' />
						</Col>
						<Col>
							<span style={{ fontWeight: 700, fontSize: '2rem' }}>
								<AnimatedNumber
									value={299}
									formatValue={formatValue}
								/>
							</span>
						</Col>
					</Row>
					<Row>
						<p style={{ color: '#698598' }}>Total campaigns</p>
					</Row>
				</div>
			</Row>
		</div>
	)
}

export default HeaderBottom
