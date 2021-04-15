import { NumberLable, Title, StepContainer } from './style'
const Step = ({ number, title, steps }) => {
	return (
		<StepContainer>
			<NumberLable>{number}</NumberLable>
			<Title>{title}</Title>
			<ul>
				{steps.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
		</StepContainer>
	)
}

export default Step
