import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Layout from './hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'

import BurgerBuilder from './containers/Burger_Builder/Burger_Builder'

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path = '/checkout' component = {Checkout} />
						<Route path = '/' component = {BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
