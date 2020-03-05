import React, { Component } from 'react'
import Aux from '../Auxiliar/Auxiliar'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Tool_Bar/Tool_Bar'
import SideDrawer from '../../components/Navigation/Side_Drawer/Side_Drawer'

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState( { showSideDrawer: false } )
	}

	sideDrawerTogglerHandler = () => {
		this.setState( ( prevState ) =>{
			return { showSideDrawer: !prevState.showSideDrawer }
		}) 
	}

	render () {
		return(
			<Aux>
			<Toolbar drawerTogglerClicked = { this.sideDrawerTogglerHandler }/>
			<SideDrawer 
				open = { this.state.showSideDrawer } 
				closed = { this.sideDrawerClosedHandler }/>
			<main className = { classes.Content } >
				{ this.props.children }
			</main>
			</Aux>
		)
	}
}

export default Layout