import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './Burger_Ingredients/Burger_Ingredients'

const burger = ( props ) => {

	let ingredientsArray = Object.keys( props.ingredients )
																 .map( igKey => {
																	return [...Array( props.ingredients[igKey] )]
																		.map((_,i) => {
																			return <BurgerIngredient key ={igKey + i} type = {igKey}/>
																		})
																 })
																 .reduce( (arr, el) => {
																	return arr.concat(el)
																 }, []);
	
	if( ingredientsArray.length === 0){
		ingredientsArray = <p>Empieze a agregar ingredientes</p>
	}
	
	return (
		<div className = {classes.Burger}>
			<BurgerIngredient type = "bread-top" />
			{ ingredientsArray }
			<BurgerIngredient type = "bread-bottom" />
		</div>
	);
};

export default burger