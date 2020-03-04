import React from 'react'
import Aux from '../../hoc/Auxiliar'
import classes from './Layout.css'
import Toolbar from '../Navigation/Tool_Bar/Tool_Bar'
import SideDrawer from '../Navigation/Side_Drawer/Side_Drawer'

const layout = ( props ) => (

	<Aux>
		<Toolbar />
		<SideDrawer />

		<main className = { classes.Content } >
			{ props.children }
		</main>
	</Aux>
);

export default layout