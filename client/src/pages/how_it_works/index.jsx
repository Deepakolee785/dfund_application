import { useState } from 'react'
import { Collapse } from 'antd'
import Layout from '../../layout/user_layout'
import Header from '../../components/header'
import HowItWorksBg from '../../assets/images/how_it_works.svg'
import { Container } from '../explore/style'
import { Heading } from '../home/style'
import Step from './step'
import { StepsContainer, SectionDiv } from './style'
import { Button } from '../../components/button'

const { Panel } = Collapse

const faqs = [
	{
		key: 1,
		question: 'How does Dfund works?',
		answer: 'You start your Dfund by telling your story and setting a goal',
	},
	{
		key: 2,
		question: 'What can I raise money for?',
		answer: 'You start your Dfund by telling your story and setting a goal',
	},
	{
		key: 3,
		question: 'How do I withdraw funds from campaigns?',
		answer: 'You start your Dfund by telling your story and setting a goal',
	},
	{
		key: 4,
		question: "What if I don't react goal",
		answer: 'You start your Dfund by telling your story and setting a goal',
	},
]

const HowItWorks = () => {
	const [activeQuestion, setactiveQuestion] = useState(1)

	const onChangePanel = key => {
		// console.log(key)
		setactiveQuestion(key)
	}

	return (
		<Layout>
			<Header
				heading='How it works?'
				subHeading='Dfund  is the best place to fundraise, whether you are an individual, group, or organization.'
			/>
			<div className='Center'>
				<img src={HowItWorksBg} alt='' />
			</div>
			<br />
			<br />
			<Container>
				<Heading>Start a Dfund Campagin in following steps:</Heading>
				<StepsContainer>
					<Step
						number={1}
						title='Start a Dfund Campaign'
						steps={[
							'Add a picture',
							'Set your goal gamount',
							'Tell your story',
							'Lunch the campaign',
						]}
					/>
					<Step
						number={2}
						title='Share with friends'
						steps={[
							'Send emails',
							'Send text messages',
							'Share on social media',
						]}
					/>
					<Step
						number={3}
						title='Create spending request '
						steps={[
							'Add  description',
							'Add amount  to withdraw',
							'Add vendor address',
						]}
					/>
					<Step
						number={4}
						title='Transfer Funds'
						steps={[
							'Get more than 50% approval',
							'Finalize request',
							'Transfer and Buy',
						]}
					/>
				</StepsContainer>
				<br />
				{/* <div className='Center'></div> */}
			</Container>
			<SectionDiv>
				<h4>Affordable, Easy, and Secure All around the world </h4>
				<br />
				<p>Ready. Set. Lunch!</p>
				<br />
				<Button type='primary' variant='primary'>
					Start a Dfund Campaign Now!
				</Button>
			</SectionDiv>

			<Container>
				<Heading>Frequently Asked Questions</Heading>
				<Collapse
					defaultActiveKey={[1]}
					activeKey={activeQuestion}
					onChange={onChangePanel}
				>
					{faqs.map(item => {
						return (
							<Panel header={item.question} key={item.key}>
								<p>{item.answer}</p>
							</Panel>
						)
					})}
					{/* <Panel header='This is panel header 1' key={1}>
						<p>{text}</p>
					</Panel>
					<Panel header='This is panel header 2' key={2}>
						<p>{text}</p>
					</Panel>
					<Panel header='This is panel header 3' key={3}>
						<p>{text}</p>
					</Panel> */}
				</Collapse>
			</Container>
		</Layout>
	)
}

export default HowItWorks
