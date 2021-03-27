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
				label: 'Transactions for 2021(in ETH)',
				data: dataSet,
				borderColor: ['rgb(233, 30, 99,0.2)'],
				backgroundColor: ['rgb(233, 30, 99,0.2)'],
				pointBackgroundColor: 'rgb(233, 30, 99,0.4)',
				pointBorderColor: 'rgb(233, 30, 99,0.4)',
			},
			// {
			// 	label: 'Sales for 2019(M)',
			// 	data: [1, 3, 2, 2, 3],
			// 	borderColor: ['rgb(156, 39, 176,0.3)'],
			// 	backgroundColor: ['rgb(156, 39, 176,0.3)'],
			// 	pointBackgroundColor: 'rgb(156, 39, 176,0.4)',
			// 	pointBorderColor: 'rgb(156, 39, 176,0.4)',
			// },
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
			<Line data={data} options={options} />
		</div>
	)
}

export default LineChart
