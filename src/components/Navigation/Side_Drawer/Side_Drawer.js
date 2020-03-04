import React, { Fragment } from 'react'

import Logo from '../../Logo/Logo'
import NavItems from '../Nav_Items/Nav_Items'
import classes from './Side_Drawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = ( props ) => {

	let attachedClasses = [classes.SideDrawer, classes.Close]

	if( props.open ){
		attachedClasses = [classes.SideDrawer, classes.Open]
	}

	return (

		<Fragment>
			<BackDrop show = { props.open } clicked = { props.closed } />
			<div className = { attachedClasses.join(' ') }>
				
				<div className = {classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavItems />
				</nav>
			</div>
		</Fragment>
	)

}

export default sideDrawer