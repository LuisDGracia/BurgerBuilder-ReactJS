import React, { Component } from "react";
import Axios from '../../axios_orders'

import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/Order_Summary/Order_Summary'
import Aux from '../../hoc/Auxiliar/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build_Controls/Build_Controls'
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
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		Axios.get( 'https://react-my-burger-cb3e2.firebaseio.com/ingredients.json')
				 .then( response => {
					this.setState( { ingredients: response.data } )
					this.isPurchasable( this.state.ingredients )
				 })
				 .catch( err => {
					 this.setState( { error: true } )
				 } )
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
		const queryParams = []

		for (let key in this.state.ingredients) {
			queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`)
		}
		queryParams.push(`price=${this.state.totalPrice}`)
		const queryString = queryParams.join('&')

		this.props.history.push( {
			pathname: '/checkout',
			search: `?${queryString}`
		})

	}

	render() {

		const disabledInfo = {...this.state.ingredients}

		for( let key in disabledInfo ){
			disabledInfo[ key ] = ( disabledInfo[key] <= 0 )
		}

		let orderSummary = null		
		let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner />
		
		if( this.state.ingredients ){
			burger = (
				<Aux>
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

		 if( this.state.loading ){
			orderSummary = <Spinner />
		}

		 orderSummary = <OrderSummary 
											ingredients = { this.state.ingredients }
											purchaseCancelled = { this.purchaseCancelHandler }
											purchaseContinued = { this.purchaseContinueHandler }
											price = { this.state.totalPrice }/>
		}
		
		
		return (
			<Aux>
				<Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelHandler}>
					{ orderSummary }
				</Modal>
				{ burger }
			</Aux>
		)
	}
}

export default withErrorHandler( BurgerBuilder, Axios );