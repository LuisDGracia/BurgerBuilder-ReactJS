import React from 'react'
import Aux from '../../hoc/Auxiliar'
import classes from './Layout.css'
import Toolbar from '../Navigation/Tool_Bar/Tool_Bar'

const layout = ( props ) => (

	<Aux>
		<Toolbar />

		<main className = { classes.Content } >
			{ props.children }
		</main>
	</Aux>
);

export default layout