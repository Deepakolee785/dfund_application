import { Button } from '../../../components/button'
import { BottomSectionDiv, BottomHeading } from '../style'

import { Link } from 'react-router-dom'
const HomeBottom = () => {
	return (
		<BottomSectionDiv
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<BottomHeading>
				Ready to start fundrasing through Dfund Network?
			</BottomHeading>
			<Link to='/create/campaign'>
				<Button type='primary' variant='primary'>
					Create a Dfund Campaign
				</Button>
			</Link>
		</BottomSectionDiv>
	)
}

export default HomeBottom
