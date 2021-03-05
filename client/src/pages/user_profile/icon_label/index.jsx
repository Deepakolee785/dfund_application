const IconLabel = ({ icon, label }) => {
	return (
		<div style={{ margin: '1rem 0 1rem 2rem' }}>
			<img
				src={icon}
				alt=''
				style={{
					marginRight: '0.5rem',
					width: '24px',
					height: '24px',
					// marginTop: '-1rem',
				}}
			/>
			<strong
				style={{
					fontWeight: 500,
					backgroundColor: 'rgb(95, 102, 241,0.2)',
					padding: '0.35rem',
					borderRadius: '1rem',
				}}
			>
				{label}
			</strong>
		</div>
	)
}

export default IconLabel
