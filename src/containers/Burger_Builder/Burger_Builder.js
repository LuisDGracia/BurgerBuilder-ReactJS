import React, { Component } from "react";

import Aux from '../../hoc/Auxiliar/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary'
import Axios from '../../axios_orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
}
class BurgerBuilder extends Component{

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese:0,
			meat:  0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	}

	isPurchasable( ingredients ){
		
		const sum = Object.keys(ingredients)
											.map( igKey => {
												return ingredients[ igKey ]
											})
											.reduce( (sum, el) => {
												return sum + el;
											}, 0 );

		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = ( ingredient ) => {
		
		const oldCount = this.state.ingredients[ ingredient ];
		const updatedCount = oldCount + 1;

		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[ingredient] = updatedCount

		const priceAddition = INGREDIENT_PRICES[ ingredient ];
		const oldPrice = this.state.totalPrice;

		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.isPurchasable( updatedIngredients);

	};

	removeIngredientHandler = ( ingredient ) => {
		
		const oldCount = this.state.ingredients[ ingredient ]
		if( oldCount <= 0 ){
			return;
		}

		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[ ingredient ] = updatedCount

		const priceDeduction = INGREDIENT_PRICES[ ingredient ];
		const oldPrice = this.state.totalPrice;

		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.isPurchasable( updatedIngredients );

	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		// alert("You continue!")
		this.setState( { loading: true } )
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer:{
				name: 'Luis De Gracia',
				address: {
					street: 'Some Silicon valley street',
					zipcode: '44444',
					country: 'USA',
				},
				email: 'someEmail@google.com'
			},
			deliveryMethod: 'Uber'
		}

		Axios.post('/orders.json', order)
					.then( response => {
						this.setState( { loading: false, purchasing: false } )
					})
					.catch( err => {
						this.setState( { loading: false, purchasing: false } )
					});
	}

	render() {

		const disabledInfo = {...this.state.ingredients}

		for( let key in disabledInfo ){
			disabledInfo[ key ] = ( disabledInfo[key] <= 0 )
		}

		let orderSummary = <OrderSummary 
				ingredients = { this.state.ingredients }
				purchaseCancelled = { this.purchaseCancelHandler }
				purchaseContinued = { this.purchaseContinueHandler }
				price = { this.state.totalPrice }/>

		if( this.state.loading ){
			orderSummary = <Spinner />
		}

		return (
			<Aux>

				<Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelHandler}>
					{ orderSummary }
				</Modal>

				<Burger ingredients = { this.state.ingredients } />
				<BuildControls 
					ingredientAdded = { this.addIngredientHandler } 
					ingredientRemove = { this.removeIngredientHandler } 
					disabled = { disabledInfo } 
					purchasable = { this.state.purchasable }
					ordered = { this.purchaseHandler }
					price = { this.state.totalPrice }/>
			</Aux>
		)
	}
}

export default withErrorHandler( BurgerBuilder, Axios );