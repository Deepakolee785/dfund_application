import { Doughnut } from 'react-chartjs-2'
const DoughnutChart = () => {
	const data = {
		labels: ['Successful', 'Unsuccessful'],
		datasets: [
			{
				label: 'Campaign',
				data: [2, 6],
				backgroundColor: ['#00A10C', '#e91e63'],
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Campaign Successful/Unsuccessful',
		},
	}
	return (
		<div
			style={{
				width: '450px',
				marginLeft: '5px',
				margin: '1rem 1rem 1rem 0',
				background: '#f7f4f4',
				padding: '0.3rem',
			}}
		>
			<Doughnut data={data} options={options} />
		</div>
	)
}

export default DoughnutChart
