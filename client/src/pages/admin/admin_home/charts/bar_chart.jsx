import { Bar } from 'react-chartjs-2'
import { useState } from 'react'
import { Select } from 'antd'

const { Option } = Select

const BarChart = ({ campaignsData }) => {
	const [year, setYear] = useState(2021)
	const campaigns = campaignsData[year]

	const dataLabels = campaigns ? Object.keys(campaigns) : []
	const dataSet = campaigns ? Object.values(campaigns) : []

	function handleChange(value) {
		setYear(value)
	}

	const data = {
		labels: dataLabels,
		datasets: [
			{
				label: `Campaigns created in ${year}`,
				data: dataSet,

				backgroundColor: [
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
					'#5f66f1',
				],
			},
		],
	}
	const options = {
		title: {
			display: true,
			text: 'Campaign created in Month',
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
					},
				},
			],
		},
	}
	return (
		<div
			style={{
				width: '720px',
				margin: '1rem 1rem 1rem 0',
				background: 'rgb(247, 244, 244,0.75)',
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
			<Bar data={data} options={options} />
		</div>
	)
}

export default BarChart
