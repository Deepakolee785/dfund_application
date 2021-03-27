import { Line } from 'react-chartjs-2'
const LineChart = () => {
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mar'],
		datasets: [
			{
				label: 'Sales for 2020(M)',
				data: [3, 2, 2, 1, 5],
				borderColor: ['rgb(233, 30, 99,0.2)'],
				backgroundColor: ['rgb(233, 30, 99,0.2)'],
				pointBackgroundColor: 'rgb(233, 30, 99,0.4)',
				pointBorderColor: 'rgb(233, 30, 99,0.4)',
			},
			{
				label: 'Sales for 2019(M)',
				data: [1, 3, 2, 2, 3],
				borderColor: ['rgb(156, 39, 176,0.3)'],
				backgroundColor: ['rgb(156, 39, 176,0.3)'],
				pointBackgroundColor: 'rgb(156, 39, 176,0.4)',
				pointBorderColor: 'rgb(156, 39, 176,0.4)',
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Line Chart',
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						steps: 1,
					},
				},
			],
		},
	}
	return (
		<div
			style={{
				width: '720px',
				margin: '2rem 1rem 1rem 0',
			}}
		>
			<Line data={data} options={options} />
		</div>
	)
}

export default LineChart
