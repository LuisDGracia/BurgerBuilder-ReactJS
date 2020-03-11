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
				value: '',
				validation: {
					required: true
				},
				valid: true
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: true
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: true
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: true
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: true
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

		const formData = {}

		for (const formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
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

	checkValidity ( value, rules  ) {
		let isValid = true
		
		if( rules.required ){
			isValid = value.trim() !== '' && isValid
		}

		if( rules.minLength){
			isValid = value.Length >= rules.minLength && isValid
		}

		if( rules.maxLength){
			isValid = value.Length <= rules.maxLength && isValid
		}

		return isValid
	}

	inputChangedHandle = ( event, inputIdentifier ) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}

		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		}

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)



		updatedOrderForm[inputIdentifier] = updatedFormElement
		this.setState( { orderForm: updatedOrderForm } )
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
			<form onSubmit = { this.orderHandler }>
					{formElementsArray.map(formElement => (
						<Input 
							key = { formElement.id }
							elementType = { formElement.config.elementType }
							elementConfig = { formElement.config.elementConfig }
							value = { formElement.config.value }
							changed = { (event) => this.inputChangedHandle ( event,formElement.id )} />
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