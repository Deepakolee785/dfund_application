import { useEffect, useState } from 'react'
import { getAllTransactions } from '../../../api/transaction'

const Transaction = () => {
	const [state, setstate] = useState(null)
	useEffect(() => {
		getAllTransactions()
			.then(res => {
				// console.log(res)
				setstate(res.data.transactions)
			})
			.catch(err => console.log(err))
	}, [])
	return (
		<div>
			Transaction
			<pre>{state && JSON.stringify(state, null, 6)}</pre>
		</div>
	)
}

export default Transaction
