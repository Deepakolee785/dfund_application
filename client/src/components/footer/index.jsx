import { BottomFooter, FooterContainer } from './style'
import Logo from '../../assets/images/box_logo.svg'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<FooterContainer>
			<footer>
				<Row gutter={[10, 40]} justify='space-around'>
					<Col>
						<img src={Logo} alt='' />
					</Col>
					<Col>
						<h3>Links</h3>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/explore'>Explore</Link>
							</li>
							<li>
								<Link to='/how_it_works'>How it works?</Link>
							</li>
							<li>
								<Link to='/contact'>Contact Us</Link>
							</li>
							<li>
								<Link to='/about'>About Us</Link>
							</li>
						</ul>
					</Col>
					<Col>
						<h3>Policy</h3>
						<ul>
							<li>Terms and conditions</li>
							<li>Privacy Policy</li>
							<li>FAQ</li>
						</ul>
					</Col>
					<Col>
						<h3>Social</h3>
						<ul>
							<li>Facebook</li>
							<li>Twitter</li>
							<li>Instagram</li>
							<li>Linkedlin</li>
							<li>Telegram</li>
						</ul>
					</Col>
					<Col>
						<h3>Contact</h3>
						<ul>
							<li>Kathamdu, Nepal</li>
							<li>+01-4564564</li>
							<li>contact@dfund.com</li>
						</ul>
					</Col>
				</Row>
			</footer>
			<BottomFooter>
				<p>&copy; 2021 Dfund</p>
			</BottomFooter>
		</FooterContainer>
	)
}

export default Footer
