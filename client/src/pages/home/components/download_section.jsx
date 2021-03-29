import { Row, Col } from 'antd'

import { ImpactSectionDiv, SectionContainer, Heading } from '../style'
import MobilePhoto from '../../../assets/images/photo-mobile-app.png'
import android from '../../../assets/images/downlaod_android.png'
import iphone from '../../../assets/images/download_iphone.png'

const DownloadSection = () => {
	return (
		<ImpactSectionDiv>
			<SectionContainer>
				<Row
					style={{ paddingTop: '2rem' }}
					justify='space-between'
					align='middle'
				>
					<Col>
						<img
							src={MobilePhoto}
							alt=''
							style={{
								height: '20rem',
								borderRadius: '0.3rem',
								padding: '0.7rem',
								border: '5px solid rgb(95, 102, 241)',
								transform: 'rotateY(0deg) rotate(10deg)',
							}}
						/>
					</Col>
					<Col>
						<h5
							style={{
								fontWeight: 600,
								opacity: 0.75,
								fontSize: '0.75rem',
							}}
						>
							WILL BE AVAILABLE SOON
						</h5>
						<Heading>Dfund Mobile App</Heading>
						<p style={{ color: '#698598' }}>
							Start and manage campaigns, engage with supporters,
							and discover important causes — all on the go
						</p>
						<br />
						<br />
						<Row>
							<Col>
								<img
									src={android}
									alt=''
									style={{
										height: '3rem',
										marginRight: '1rem',
									}}
								/>
							</Col>
							<Col>
								<img
									src={iphone}
									alt=''
									style={{
										height: '3rem',
									}}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</SectionContainer>
		</ImpactSectionDiv>
	)
}

export default DownloadSection
