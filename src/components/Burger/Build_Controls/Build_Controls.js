import React from 'react'

import classes from './Build_Controls.css'
import BuildControl from './Build_Control/Build_Control'

const controls = [
	{ label: 'Salad', type: 'salad'},
	{ label: 'Bacon', type: 'bacon'},
	{ label: 'Cheese', type: 'cheese'},
	{ label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
	<div className = { classes.BuildControls }>
		{controls.map(ctrl => (
			<BuildControl 
			key = {ctrl.label} 
			label = {ctrl.label} 
			added = { () => props.ingredientAdded(ctrl.type) } 
			removed = { () => props.ingredientRemove(ctrl.type) } 
			disabled = { props.disabled[ctrl.type] }/>
		))}
	</div>
);

export default buildControls