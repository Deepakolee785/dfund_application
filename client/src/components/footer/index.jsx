import { BottomFooter, FooterContainer } from './style'
import Logo from '../../assets/images/box_logo.svg'
import { Col, Row } from 'antd'

const Footer = () => {
	return (
		<FooterContainer>
			<footer>
				<Row gutter={[10, 40]}>
					<Col>
						<img src={Logo} alt='' />
					</Col>
					{/* <Col>
					<ul>
						<li>Home</li>
						<li>Explore</li>
						<li>How it works?</li>
						<li>Contact Us</li>
						<li>About Us</li>
					</ul>
				</Col> */}
				</Row>
			</footer>
			<BottomFooter>
				<p>&copy; 2021 Dfund</p>
			</BottomFooter>
		</FooterContainer>
	)
}

export default Footer
