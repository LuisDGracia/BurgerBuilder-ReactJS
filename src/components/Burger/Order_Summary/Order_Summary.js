import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliar/Auxiliar'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

	// This doesn't need to be a class component

	componentDidUpdate(){
		console.log('[Order Summary] Did update')
	}

	render() {

		const ingredientsSUmmary = Object.keys( this.props.ingredients )
		.map( igKey => {
			return (
			<li key = { igKey }>
				<span style= { { textTransform: 'capitalize' } }>{ igKey }</span>: { this.props.ingredients[igKey] } 
			</li>)
		})

		return (
			<Aux>
				<h3>Your Order</h3>
				<p> A delicious burger with the followeing ingredients:</p>
				<ul>
					{ ingredientsSUmmary }
				</ul>
				<p> Total Price: <strong>${ this.props.price.toFixed(2) }</strong></p>
				<p> Continue to CheckOut?</p>
				<Button btnType = "Danger" clicked = { this.props.purchaseCancelled } >CANCEL</Button>
				<Button btnType = "Success" clicked = { this.props.purchaseContinued } >CONTINUE</Button>
			</Aux>
		)
	}
}

export default OrderSummary