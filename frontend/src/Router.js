import React, { Component} from 'react';
import {
    BrowserRouter as ReactRouter,
    Route,
    Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import App from './App';
import Dashboard from './pages/Dashboard';
import NewPlaces from './pages/places/NewPlaces';

const userSignedIn = false;

class Router extends Component {
  signedInRoutes() {
    if (this.props.user.token) {
      return <Route path="/new" component={NewPlaces}></Route>;
    }
  }
  home() {
    if (this.props.user.token) return Dashboard;

    return Home;
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <App>
          <Switch>
            <Route exact path="/" component={this.home()}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            {this.signedInRoutes()}
          </Switch>
        </App>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Router);
