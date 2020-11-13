import React, {Component} from 'react';
import Title from '../components/Title';
import { TextField, RaisedButton } from 'material-ui';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

export default class Signup extends Component{
    render(){
        return(
            <div className="row middle-xs">
                <div className="col-xs-12 col-sm-6">
                    <Container>
                        <div style={{"textAlign":"left"}}>
                            <Title />
                            <TextField 
                                floatingLabelText="Correo Electrónico"
                                type="email"
                                className="textfield"
                            />
                            <TextField 
                                floatingLabelText="Contraseña"
                                type="password"
                                className="textfield"
                            />
                            <div className="Login-actions">
                            <Link to="/login" style={{"marginRight":"1em"}}>Ya Tengo Cuenta</Link>
                                <RaisedButton label="Crear Cuenta" secondary={true} />
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="Login-background" style={{'backgroundImage':"url("+process.env.PUBLIC_URL + '/images/signup-background.jpg'+")"}}></div>
                </div>                
            </div>
        )
    }
}