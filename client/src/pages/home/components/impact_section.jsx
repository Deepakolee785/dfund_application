import {
	ImpactSectionDiv,
	// ImpactSectionContainer,
	BadgeLabel,
	Heading,
	SubHeading,
} from '../style'
import { Row, Col } from 'antd'
import AnimatedNumber from 'animated-number-react'
import { Button } from '../../../components/button'

import Goal1 from '../../../assets/images/goal1.svg'
import Goal2 from '../../../assets/images/goal2.svg'
import Goal3 from '../../../assets/images/goal3.svg'
import Goal4 from '../../../assets/images/goal4.svg'

const ImpactSection = () => {
	const formatValue = value => `${Number(value).toFixed(0)}+`

	return (
		<ImpactSectionDiv>
			<br />
			<BadgeLabel>IMPACT</BadgeLabel>
			<div style={{ margin: '1.25rem 0.5rem' }}>
				<Row justify='space-around'>
					<Col>
						<Row justify='space-around' style={{ width: '35vw' }}>
							<div>
								<Row align='bottom' justify='space-between'>
									<Col>
										<img
											src={Goal1}
											alt=''
											width='58'
											height='58'
										/>
									</Col>
									<Col>
										<span
											style={{
												fontWeight: 700,
												fontSize: '2rem',
											}}
										>
											<AnimatedNumber
												value={8}
												formatValue={formatValue}
											/>
										</span>
									</Col>
								</Row>
								<Row>
									<p style={{ color: '#698598' }}>
										Active Campaigns
									</p>
								</Row>
							</div>
							<div>
								<Row align='bottom' justify='space-around'>
									<Col>
										<img
											src={Goal2}
											alt=''
											width='58'
											height='58'
										/>
									</Col>
									<Col>
										<span
											style={{
												fontWeight: 700,
												fontSize: '2rem',
											}}
										>
											<AnimatedNumber
												value={0}
												formatValue={formatValue}
											/>
										</span>
									</Col>
								</Row>
								<Row>
									<p style={{ color: '#698598' }}>
										Successful campaigns
									</p>
								</Row>
							</div>
						</Row>
						<br />
						<br />
						<Row
							justify='space-around'
							style={{ marginLeft: '-1.5rem' }}
						>
							<div>
								<Row align='bottom' justify='space-between'>
									<Col>
										<img
											src={Goal3}
											alt=''
											width='62'
											height='62'
										/>
									</Col>
									<Col>
										<span
											style={{
												fontWeight: 700,
												fontSize: '2rem',
											}}
										>
											<AnimatedNumber
												value={5}
												formatValue={formatValue}
											/>{' '}
											{/* <small>ETH</small> */}
										</span>
									</Col>
								</Row>
								<Row>
									<p style={{ color: '#698598' }}>
										Toal fund collected
									</p>
								</Row>
							</div>
							<div>
								<Row align='bottom' justify='space-between'>
									<Col>
										<img
											src={Goal4}
											alt=''
											width='62'
											height='62'
										/>
									</Col>
									<Col>
										<span
											style={{
												fontWeight: 700,
												fontSize: '2rem',
											}}
										>
											<AnimatedNumber
												value={9}
												formatValue={formatValue}
											/>
										</span>
									</Col>
								</Row>
								<Row>
									<p style={{ color: '#698598' }}>
										Total campaigns
									</p>
								</Row>
							</div>
						</Row>
					</Col>
					<Col>
						<Heading>
							Nepal’s first decentralized crowdfunding platform
						</Heading>
						<SubHeading>
							Dfund gives you tool to raise funds for anything you
							wish for using Blockchain technologies.
						</SubHeading>
						<br />
						<br />
						<br />
						<Button
							type='primary'
							variant='primary'
							style={{ marginRight: '1rem' }}
						>
							Support a campaign
						</Button>
						<Button type='primary' variant='primary'>
							Start a campaign
						</Button>
					</Col>
				</Row>
			</div>
			{/* <ImpactSectionContainer></ImpactSectionContainer> */}
		</ImpactSectionDiv>
	)
}

export default ImpactSection
