import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

import BurgerBuilder from './containers/Burger_Builder/Burger_Builder'

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path = '/checkout' component = { Checkout } />
						<Route path = '/orders' component = { Orders } />
						<Route path = '/' component = { BurgerBuilder } />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
