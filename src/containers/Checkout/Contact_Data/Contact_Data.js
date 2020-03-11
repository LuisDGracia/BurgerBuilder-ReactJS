import React, { Component } from 'react'

import Axios from '../../../axios_orders'
import classes from './Contact_Data.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'


class Contact_Data extends Component {
	
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'uber', displayValue: 'Uber'},
						{value: 'globo', displayValue: 'Globo'}
					]
				},
				value: ''
			}
		},
		loading: false
	}

	orderHandler =  ( event ) => {
		event.preventDefault()
		this.setState( { loading: true } )
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
		}

		Axios.post('/orders.json', order)
					.then( response => {
						this.setState( { loading: false} )
						this.props.history.push('/')
					})
					.catch( err => {
						this.setState( { loading: false} )
					});
	}
	
	render() {

		const formElementsArray = []

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}

		let form = (
			<form>
					{formElementsArray.map(formElement => (
						<Input 
							key = { formElement.id }
							elementType = { formElement.config.elementType }
							elementConfig = { formElement.config.elementConfig }
							value = { formElement.config.value } />
					))}
					<Button 
						btnType = 'Success'
						clicked = { this.orderHandler } >ORDER</Button>
				</form>
		);

		if( this.state.loading ){
			form = <Spinner />
		}

		return (
			<div className = { classes.ContactData } >
				<h4>Enter your Contact Data</h4>
				{ form }
			</div>
		)
	}
}

export default Contact_Data