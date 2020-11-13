import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import  MyAppBar  from './MyAppBar';
import { logout } from '../../actions/userAction';

class Navigation extends Component{
  constructor(props){
    super(props);
    this.goHome = this.goHome.bind(this);
    this.logout = this.logout.bind(this);
  }

  goHome(){
    this.props.dispatch(push('/'));
  }

  logout(){
    this.props.dispatch(logout());
    this.props.dispatch(push('/'));
  }

  render(){
    return(
      <MyAppBar goHome={this.goHome} user={this.props.user} logout={this.logout}/>
    )
  }
}

function mapStateToProps(state,owProps){
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(Navigation);
