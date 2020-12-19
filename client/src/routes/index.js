import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../components/Home'
import CampaignFactory from '../components/CampaignFactory'
import CampaignDetails from '../components/CampaignDetails'
import CreateCampaign from '../components/CreateCampaign'

const Routes = () => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route exact path='/factory' component={CampaignFactory} />
		<Route exact path='/campaign/:campaign' component={CampaignDetails} />
		<Route path='/create/campaign' component={CreateCampaign} />
	</Switch>
)

export default Routes
