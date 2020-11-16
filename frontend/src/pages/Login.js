import React, { Component } from "react";
import Title from "../components/Title";
import { TextField, RaisedButton } from "material-ui";
import Container from "../components/Container";
import { login, signUp } from "../requests/auth";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/userAction';
import { push } from 'connected-react-router';
import Swal from 'sweetalert2';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={uploading:false}
    this.requestAuth = this.requestAuth.bind(this);
    this.auth = this.auth.bind(this);
  }

  requestAuth() {
    const credentials = {
      email: this.refs.emailField.getValue(),
      password: this.refs.passwordField.getValue(),
    };
    if(credentials["email"] === "" || credentials["password"] === ""){
      Swal.fire(
        'Datos Inválidos',
        'Llene todos los campos',
        'error'
      );
    }else{
      this.setState({uploading:true});
      login(credentials).then(this.auth).catch(console.log);
    }
  }

  auth(data){
    this.setState({uploading:false});
    if(data.token){
      this.props.dispatch(actions.login(data.token));
      this.props.dispatch(actions.loadUser(data.me));
      Swal.fire(
        'Enhorabuena',
        'Sesión iniciada correctamente',
        'success'
      );
      this.props.dispatch(push('/'));
    }else{
      Swal.fire(
        'Datos Inválidos',
        'Usuario o contraseña invalidos',
        'error'
      );
    }
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
              <div className="Login-actions">
                <Link to="/signup" style={{ marginRight: "1em" }}>Crear Nueva Cuenta</Link>
                <RaisedButton onClick={this.requestAuth} label="Ingresar" secondary={true} disabled={this.state.uploading}/>
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
