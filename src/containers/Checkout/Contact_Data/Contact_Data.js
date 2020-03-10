import React, { Component } from 'react'
import Axios from '../../../axios_orders'

import Button from '../../../components/UI/Button/Button'
import classes from './Contact_Data.css'
import Spinner from '../../../components/UI/Spinner/Spinner'


class Contact_Data extends Component {
	
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler =  ( event ) => {
		event.preventDefault()
		this.setState( { loading: true } )
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
						this.setState( { loading: false} )
						this.props.history.push('/')
					})
					.catch( err => {
						this.setState( { loading: false} )
					});
	}
	
	render() {

		let form = (
			<form>
					<input className = { classes.Input } type = "text" name = "name" placeholder = "Your name" />
					<input className = { classes.Input } type = "text" name = "email" placeholder = "Your email" />
					<input className = { classes.Input } type = "text" name = "street" placeholder = "Street" />
					<input className = { classes.Input } type = "text" name = "postal" placeholder = "Postal Code" />

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