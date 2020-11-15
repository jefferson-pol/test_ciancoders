import React, { Component } from "react";
import Title from "../components/Title";
import { TextField, RaisedButton } from "material-ui";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp,login } from "../requests/auth";
import * as actions from "../actions/userAction";
import { push } from "connected-react-router";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.createdAccount = this.createdAccount.bind(this);
    this.auth = this.auth.bind(this);
  }
  createdAccount() {
    const data = {
      password : this.refs.password.getValue(),
      email : this.refs.email.getValue(),
      first_name : this.refs.first_name.getValue(),
      last_name : this.refs.last_name.getValue(),
      Perfil: {
        telefono : this.refs.telefono.getValue(),
        direccion : this.refs.direccion.getValue()
      }
    };
    signUp(data)
    .then(response =>{
        let credenciales  = {
          email : response.email,
          password: data.password
        }
        login(credenciales).then(this.auth).catch(console.log);
      }
    ).catch(console.log);
  }

  auth(data){
    this.props.dispatch(actions.login(data.token));
    this.props.dispatch(actions.loadUser(data.me));
    this.props.dispatch(push('/'));
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
                ref="email"
              />
              <TextField
                floatingLabelText="Contraseña"
                type="password"
                className="textfield"
                ref="password"
              />
              <TextField
                floatingLabelText="Nombre"
                type="text"
                className="textfield"
                ref="first_name"
              />
              <TextField
                floatingLabelText="Apellido"
                type="text"
                className="textfield"
                ref="last_name"
              />
              <TextField
                floatingLabelText="Dirección"
                type="text"
                className="textfield"
                ref="direccion"
              />
              <TextField
                floatingLabelText="Telefono"
                type="text"
                className="textfield"
                ref="telefono"
              />
              <div className="Login-actions">
                <Link to="/login" style={{ marginRight: "1em" }}>
                  Ya Tengo Cuenta
                </Link>
                <RaisedButton label="Crear Cuenta" secondary={true} onClick={this.createdAccount} />
              </div>
            </div>
          </Container>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div
            className="Login-background"
            style={{
              backgroundImage:
                "url(" +
                process.env.PUBLIC_URL +
                "/images/signup-background.jpg" +
                ")",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

function mstp(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mstp)(Signup);
