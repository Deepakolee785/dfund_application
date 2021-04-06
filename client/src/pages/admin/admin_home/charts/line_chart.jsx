import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Select } from 'antd'

const { Option } = Select

const LineChart = ({ transactionsData }) => {
	const [year, setYear] = useState(2021)
	const transaction = transactionsData[year]

	const dataLabels = transaction ? Object.keys(transaction) : []
	const dataSet = transaction ? Object.values(transaction) : []

	function handleChange(value) {
		setYear(value)
	}

	const data = {
		// labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mar'],
		labels: dataLabels,
		datasets: [
			{
				label: `Transactions for ${year}(in ETH)`,
				data: dataSet,
				borderColor: ['rgb(95, 102, 241,0.65)'],
				backgroundColor: ['rgb(95, 102, 241,0.65)'],
				pointBackgroundColor: 'rgb(95, 102, 241,1)',
				pointBorderColor: 'rgb(95, 102, 241,1)',
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Amount funded in a Month',
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
				margin: '0rem 1rem 1rem 0',
				background: '#f7f4f4',
				padding: '1rem',
			}}
		>
			<div
				style={{
					float: 'right',
					background: 'rgb(95, 102, 241,0.2)',
					padding: '1rem',
				}}
			>
				<strong>Select Year</strong>
				<br />
				<Select
					defaultValue={year}
					style={{ width: 120 }}
					onChange={handleChange}
				>
					<Option value={2020}>2020</Option>
					<Option value={2021}>2021</Option>
				</Select>
			</div>
			<Line data={data} options={options} />
		</div>
	)
}

export default LineChart
