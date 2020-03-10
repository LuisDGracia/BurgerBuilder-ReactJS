import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ContactData from './Contact_Data/Contact_Data'

import CheckoutSummary from '../../components/Order/Checkout_Summary/Checkout_Summary'

class Checkout extends Component {

	state = {
		ingredients: null,
		totalPrice: 4,
	}

	componentWillMount(){
		let query = new URLSearchParams(this.props.location.search)
		let ingredients = {}
		let price = 0;

		for (let key of query.entries()) {
			// [ ingrediente : cantidad]
			if( key[0] === 'price' ){
				price = key[1]
			}else{
				ingredients[key[0]] = +key[1]
			}
		}

		this.setState({ingredients: ingredients, totalPrice: price})
	}

	checkoutCancelled = () => {
		this.props.history.goBack()
	}

	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary ingredients = { this.state.ingredients } 
				checkoutCancelled = { this.checkoutCancelled } 
				checkoutContinued = { this.checkoutContinued } />
				<Route 
					path = {`${this.props.match.path}/contact-data`} 
					render = {( props ) => (
						<ContactData 
							ingredients = {  this.state.ingredients } 
							price = { this.state.totalPrice } 
							{...props} />
					)} />
			</div>
		)
	}
}

export default Checkout
