import { Button } from '../../../components/button'
import { BottomSectionDiv, BottomHeading } from '../style'

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

			<Button type='primary' variant='primary'>
				Create a Dfund Campaign
			</Button>
		</BottomSectionDiv>
	)
}

export default HomeBottom
