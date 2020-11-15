import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import { indigo600 } from "material-ui/styles/colors";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default class MyAppBar extends Component {

  getName(){
    if(this.props.user.first_name)
      return this.props.user.first_name;
    if(this.props.user.username)
      return this.props.user.username;
    return "";
  }
  title(){
    return (
      <span style={{'cursor':'pointer', 'textTransform': 'capitalize'}}>
        {this.props.user.token ? 'Bienvenido '+this.getName(): 'Store'}
      </span>
    );
  }
  render() {
    return (
      <AppBar
        title={this.title()}
        style={{ backgroundColor: indigo600 }}
        onTitleTouchTap={this.props.goHome}
        showMenuIconButton={false}
        iconElementRight={ this.props.user.token ? <LogoutButton logout={this.props.logout}/>:<LoginButton />}
      />
    );
  }
}
