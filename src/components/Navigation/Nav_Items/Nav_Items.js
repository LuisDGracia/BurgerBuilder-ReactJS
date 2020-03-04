import React from 'react'

import classes from './Nav_Items.css'
import NavItem from './Nav_Item/Nav_Item'

const navItems = ( props ) => (

	<ul className = { classes.NavItems}>
		<NavItem link = "/" active >Burger Builder</NavItem>
		<NavItem link = "/">Checkout</NavItem>
	</ul>

);

export default navItems