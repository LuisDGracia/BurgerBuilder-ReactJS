import React from 'react'

import Aux from '../../../hoc/Auxiliar'

const orderSummary = ( props ) => {
	
	const ingredientsSUmmary = Object.keys( props.ingredients )
		.map( igKey => {
			return (
			<li key = { igKey }>
				<span style= { { textTransform: 'capitalize' } }>{ igKey }</span>: { props.ingredients[igKey] } 
			</li>)
	})

	return (

		<Aux>
			<h3>Your Order</h3>
			<p> A delicious burger with the followeing ingredients:</p>
			<ul>
				{ ingredientsSUmmary }
			</ul>
			
			<p> Continue to CheckOut?</p>
		</Aux>
	)
}

export default orderSummary