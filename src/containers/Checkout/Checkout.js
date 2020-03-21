import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ContactData from './Contact_Data/Contact_Data'

import CheckoutSummary from '../../components/Order/Checkout_Summary/Checkout_Summary'
import { connect } from 'react-redux'

class Checkout extends Component {

	checkoutCancelled = () => {
		this.props.history.goBack()
	}

	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary ingredients = { this.props.ings } 
				checkoutCancelled = { this.checkoutCancelled } 
				checkoutContinued = { this.checkoutContinued } />
				<Route 
					path = {`${this.props.match.path}/contact-data`} 
					component = { ContactData } />
			</div>
		)
	}
}

const mapStateToProps = ( state ) => {
	return {
		ings: state.ingredients
	}
}

export default connect( mapStateToProps )(Checkout)
