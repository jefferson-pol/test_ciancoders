import React, { Component } from "react";
import Title from "../components/Title";
import { TextField, RaisedButton } from "material-ui";
import Container from "../components/Container";
import { login, signUp } from "../requests/auth";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/userAction';
import { push } from 'connected-react-router';

const NameField = (props) => (
  <TextField
    floatingLabelText="Nombre"
    type="text"
    className="textfield"
    ref={props.nameRef}
  />
);

const LoginActions= (props) =>(
  <div>
    <Link to="/signup" style={{ marginRight: "1em" }}>Crear Nueva Cuenta</Link>
    <RaisedButton onClick={props.requestAuth} label="Ingresar" secondary={true} />
  </div>
)

const SigUpActions = (props)=>(
  <div>
    <Link to="/login" style={{ marginRight: "1em" }}>Ya Tengo Cuenta </Link>
    <RaisedButton onClick={props.createAccount} label="Crear Cuenta" secondary={true} />
  </div>
)
class Login extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.requestAuth = this.requestAuth.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.auth = this.auth.bind(this);
  }
  requestAuth() {
    const credentials = {
      email: this.refs.emailField.getValue(),
      password: this.refs.passwordField.getValue(),
    };
    login(credentials).then(this.auth).catch(console.log);
  }

  auth(data){
    this.props.dispatch(actions.login(data.token));
    this.props.dispatch(actions.loadUser(data.me));
    this.props.dispatch(push('/'));
  }

  createAccount() {
    const credentials = {
      email: this.refs.emailField.getValue(),
      password: this.refs.passwordField.getValue(),
      name: this.nameElement.getValue()
    };
    signUp(credentials).then(this.auth).catch(console.log);
  }

  render() {
    return (
      <div className="row middle-xs">
        <div className="col-xs-12 col-sm-6">
          <Container>
            <div style={{ textAlign: "left" }}>
              <Title />
              <TextField
                floatingLabelText="Correo Electrónico"
                type="email"
                className="textfield"
                ref="emailField"
              />
              <TextField
                floatingLabelText="Contraseña"
                type="password"
                className="textfield"
                ref="passwordField"
              />
              <Route path="/signup" exact render={()=>(<NameField  nameRef={ (el)=> this.nameElement = el } />)}></Route>
              <div className="Login-actions">
                <Route path="/login"
                  exact
                  render={() => (<LoginActions requestAuth={this.requestAuth} />)}>
                </Route>
                <Route path="/signup"
                  exact
                  render={() => (<SigUpActions createAccount={this.createAccount} />)}>
                </Route>
              </div>
            </div>
          </Container>
        </div>
        <div className="col-xs-12 col-sm-6">
          <Route
            path="/login"
            exact
            render={() => (
              <div
                className="Login-background"
                style={{
                  backgroundImage:
                    "url(" +
                    process.env.PUBLIC_URL +
                    "/images/login-background.jpg)",
                }}
              ></div>
            )}
          ></Route>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login);
