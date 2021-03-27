import { Bar } from 'react-chartjs-2'
const BarChart = () => {
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mar'],
		datasets: [
			{
				label: 'Sales for 2020(M)',
				data: [3, 2, 2, 1, 5],
				borderColor: [
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
				],
				backgroundColor: [
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
					'rgb(233, 30, 99)',
				],
			},
			{
				label: 'Sales for 2019(M)',
				data: [1, 3, 2, 2, 3],
				borderColor: [
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
				],
				backgroundColor: [
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
					'rgb(156, 39, 176)',
				],
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Bar Chart',
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
			<Bar data={data} options={options} />
		</div>
	)
}

export default BarChart
