import React from 'react'

import classes from './Draver_Toggler.css'

const drawerToggler = ( props ) => (

  <div onClick = { props.clicked } className = { classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>

);

export default drawerToggler