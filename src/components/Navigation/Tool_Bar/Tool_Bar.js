import React from 'react'

import classes from './Tool_Bar.css'
import Logo from '../../Logo/Logo'
import Nav from '../Nav_Items/Nav_Items'

const tollbar = ( props ) => (
	<header className = { classes.Toolbar } >
		<div>MENU</div>
		<Logo />
		<nav>
			<Nav/>
		</nav>
	</header>
)

export default tollbar