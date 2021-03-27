import { Doughnut } from 'react-chartjs-2'
const DoughnutChart = () => {
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mar'],
		datasets: [
			{
				label: 'Sales for 2020(M)',
				data: [3, 2, 2, 1, 5],

				backgroundColor: [
					'rgb(233, 30, 99)',
					'rgb(156, 39, 176)',
					'#673AB7',
					'#00A10C',
					'orange',
				],
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Doughnut Chart',
		},
	}
	return (
		<div
			style={{
				width: '720px',
				margin: '2rem 1rem 1rem 0',
			}}
		>
			<Doughnut data={data} options={options} />
		</div>
	)
}

export default DoughnutChart
