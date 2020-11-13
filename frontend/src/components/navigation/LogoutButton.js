import React, { Component } from 'react';
import { FlatButton, MenuItem, IconMenu, IconButton } from 'material-ui';
import  MoreVertIcon  from 'material-ui/svg-icons/navigation/more-vert';

export default class LogoutButton extends Component{
  render(){
    return(
      <IconMenu
        iconButtonElement={<IconButton iconStyle={{'fill':'white'}}><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical:'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Cerrar Sesión" onClick={this.props.logout} />
      </IconMenu>
    )
  }
}
