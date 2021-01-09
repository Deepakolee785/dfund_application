import React, { Fragment, useContext } from 'react'
import { Button, Card, Divider, Spin } from 'antd'
import FactoryContext from '../../context/factory/factoryContext'

import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'

import { getAllCampaigns } from '../../api/web3Api'

const ExplorePage = () => {
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
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			{/* <Link to='/create/campaign'>
				<Button type='primary'>Create campaign</Button>
			</Link>
			<Divider /> */}
			<div>
				{info.isLoading && <Spin />}
				{info.data && info.data.length === 0 && (
					<div className='Center' style={{ height: '100vh' }}>
						<h4 style={{ color: 'red' }}>
							No Campaigns available right now. Create your
							campaign here.
						</h4>
						<Link to='/create/campaign'>
							<Button type='primary'>Create campaign</Button>
						</Link>
					</div>
				)}
				{/* {info.isError && <Alert message={info.error} type='error' />} */}
				{info.isSuccess && info.data && (
					<div>
						{info.data.map((campaign, index) => {
							return (
								<Fragment key={index}>
									<Card hoverable>
										<p>{campaign}</p>
										<Link to={`/campaign/${campaign}`}>
											<Button type='default'>
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

export default ExplorePage
