import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/home'
import CampaignFactory from '../components/CampaignFactory'
import CampaignDetails from '../components/CampaignDetails'
import CreateCampaign from '../components/CreateCampaign'
import LoginPage from '../pages/login/index'
import RegisterPage from '../pages/register'

const Routes = () => (
	<Switch>
		<Route exact path='/' component={Home} />
		<Route exact path='/factory' component={CampaignFactory} />
		<Route exact path='/campaign/:campaign' component={CampaignDetails} />
		<Route path='/create/campaign' component={CreateCampaign} />
		<Route path='/login' component={LoginPage} />
		<Route path='/register' component={RegisterPage} />
	</Switch>
)

export default Routes
