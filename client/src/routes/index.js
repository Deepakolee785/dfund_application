import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Home from '../pages/home'
import CampaignDetails from '../pages/campaign_details'
import CreateCampaign from '../pages/create_campaign'
import LoginPage from '../pages/login/index'
import RegisterPage from '../pages/register'
import { PublicRoute, PrivateRoute } from '../hoc/Route'
import { AdminRoute } from '../hoc/AdminRoute'
import ExplorePage from '../pages/explore'
import ViewRequestPage from '../pages/view_requests'
import CreateRequestPage from '../pages/create_request'
import { AnimatePresence } from 'framer-motion'
//
import AdminPage from '../pages/admin'
import AdminHome from '../pages/admin/admin_home'
import NotFoundPage from '../pages/not_found_page'
import UserProfile from '../pages/user_profile'
import HowItWorks from '../pages/how_it_works'
import About from '../pages/about'
import Search from '../pages/search'

const Routes = () => {
	const location = useLocation()
	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.key}>
				<Route exact path='/' component={Home} />
				<Route exact path='/explore' component={ExplorePage} />
				<Route exact path='/how_it_works' component={HowItWorks} />
				<Route exact path='/search' component={Search} />
				<Route exact path='/about' component={About} />
				<Route exact path='/explore' component={ExplorePage} />
				<Route
					exact
					path='/campaign/:campaign'
					component={CampaignDetails}
				/>
				<Route
					exact
					path='/campaign/:campaign/requests'
					component={ViewRequestPage}
				/>
				<PrivateRoute
					exact
					path='/campaign/:campaign/requests/new'
					component={CreateRequestPage}
				/>
				<PrivateRoute
					path='/create/campaign'
					component={CreateCampaign}
				/>
				<PrivateRoute path='/profile' component={UserProfile} />
				{/* <PublicRoute path='/login' component={LoginPage} /> */}
				<Route path='/login' component={LoginPage} />
				<PublicRoute path='/register' component={RegisterPage} />
				{/* <Route path='/register' component={RegisterPage} /> */}
				{/* Admin */}
				<Route exact path='/control' component={AdminPage} />
				<AdminRoute path='/control/home' component={AdminHome} />
				<Route component={NotFoundPage} />
			</Switch>
		</AnimatePresence>
	)
}

export default Routes
