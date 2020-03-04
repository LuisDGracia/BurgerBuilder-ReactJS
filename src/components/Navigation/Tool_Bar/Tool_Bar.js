import React from 'react'

import classes from './Tool_Bar.css'
import Logo from '../../Logo/Logo'
import Nav from '../Nav_Items/Nav_Items'
import DrawerToggler from '../Side_Drawer/Drawer_Toggler/Drawer_Toggler'

const tollbar = ( props ) => (
	<header className = { classes.Toolbar } >
		<DrawerToggler clicked = { props.drawerTogglerClicked } />

		<div className = { classes.Logo }>
			<Logo />
		</div>
		<nav className = { classes.DesktopOnly }>
			<Nav />
		</nav>
	</header>
)

export default tollbar