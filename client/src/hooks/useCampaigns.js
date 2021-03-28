import { useContext, useState, useEffect } from 'react'
import FactoryContext from '../context/factory/factoryContext'
import { getAllCampaigns, getCampaignDetails } from '../api/web3Api'
import { useQuery } from 'react-query'

const useCampaigns = () => {
	const { web3, accounts, contract } = useContext(FactoryContext)

	const [myData, setMyData] = useState([])
	const [loading, setLoading] = useState(false)

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

	const getContractBalance = campaignAdd => {
		return web3.eth
			.getBalance(campaignAdd)
			.then(data => data)
			.catch(err => 'N/A')
	}

	useEffect(() => {
		let isMounted = true
		if (info.data && info.data.length !== 0 && isReady) {
			// eslint-disable-next-line
			{
				setLoading(true)
				let myCampaignsList = []
				// eslint-disable-next-line
				info.data.map(async campaignAdd => {
					if (campaignAdd) {
						const balance = await getContractBalance(campaignAdd)
						getCampaignDetails(web3, campaignAdd)
							.then(data => {
								// console.log(data)
								myCampaignsList.push(data)
								if (isMounted)
									setMyData(oldData => [
										...oldData,
										{
											...data,
											fundedBalance: balance,
											campaignAdd,
										},
									])
							})
							.catch(err => console.log(err))
					}
					// eslint-disable-next-line
				})
				setLoading(false)
				// console.log(myCampaignsList)
				// setMyData(myCampaignsList)
			}
		}
		return () => {
			isMounted = false
		}
		// eslint-disable-next-line
	}, [info.data])
	return { myData, loading, campaignInfo: info }
}

export default useCampaigns
