import React, { Fragment, useContext } from 'react'
import { Alert, Button, Card, Divider, Spin } from 'antd'
import FactoryContext from '../context/factory/factoryContext'

import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'

import { getAllCampaigns } from '../api/web3Api'

const CampaignFactory = () => {
	const { web3, accounts, contract } = useContext(FactoryContext)

	const isReady =
		typeof web3 !== 'undefined' &&
		contract.length !== 0 &&
		accounts.length !== 0

	const info = useQuery(
		['deployed_campaigns'],
		() => getAllCampaigns(contract),
		{
			enabled: isReady,
		}
	)

	return (
		<div>
			<div>
				{info.isLoading && <Spin />}
				{/* {info.isError && <Alert message={info.error} type='error' />} */}
				{info.isSuccess && (
					<div>
						{info.data.map((campaign, index) => {
							return (
								<Fragment key={index}>
									<Card hoverable>
										<p>{campaign}</p>
										<Link to={`/campaign/${campaign}`}>
											<Button type='primary'>
												View details
											</Button>
										</Link>
									</Card>
									<Divider />
								</Fragment>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default CampaignFactory
