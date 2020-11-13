import React, { Component } from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';

export default class LoginButton extends Component{
  render(){
    return(
      <Link to="/login">
        <FlatButton label="Iniciar Sesion"  style={{'color':'white','marginTop':'6px'}} />
      </Link>
    )
  }
}
