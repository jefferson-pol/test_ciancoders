import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  push } from 'connected-react-router';
import { TextField, RaisedButton, Card } from 'material-ui';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import Container from '../../components/Container';
import * as requests from '../../requests/productos';

const textStyles = {
  'width': '100%'
}

class NewPlaces extends Component{
  constructor(props){
    super(props);
    this.state={uploading:false}
    this.createProducto = this.createProducto.bind(this);
  }

  createProducto(){
    const data = {
      nombre: this.refs.nombre.getValue(),
      precio: parseFloat(this.refs.precio.getValue()),
      cantidad: parseInt(this.refs.cantidad.getValue())
    }

    if(data['nombre'] === "" || data['precio'] === "" || data['cantidad'] == ""){
      Swal.fire(
        'Datos Inválidos',
        'Llene todos los campos',
        'error'
      );
      return null;
    }
    this.setState({uploading:true});
    requests.newProducto(data,this.props.user.token).then(data=>{
      this.setState({uploading:false});
      if(data.nombre){
        Swal.fire(
          'Enhorabuena',
          data.nombre+' fue creado',
          'success'
        );
        this.props.dispatch(push('/'));
      }else{
        Swal.fire(
          'Error',
          'El producto no pudo ser creado',
          'error'
        );
      }
    }).catch(console.log);

  }
  render(){
    return(
      <div>
        <Container>
          <Card style={{'textAlign':'left','padding':'20px'}}>
            <header style={{'borderButtom':'solid 2px #eee'}}>
              <Title />
            </header>
            <div>
              <TextField
                floatingLabelText="Nombre del producto"
                ref="nombre"
                style={textStyles}
              />
              <TextField
                floatingLabelText="Precio Q"
                ref="precio"
                style={textStyles}
              />
              <TextField
                floatingLabelText="Cantidad"
                ref="cantidad"
                multiLine={true}
                style={textStyles}
              />
            </div>
            <div style={{'textAlign':'right','marginTop':'1em'}}>
              <RaisedButton
                label='Guardar'
                onClick={this.createProducto}
                disabled={this.state.uploading}
                secondary={true} />
            </div>
          </Card>
        </Container>
      </div>
    )
  }
}

function mstp(state,ownPlace){
  return {
    user: state.user
  }
}

export default connect(mstp)(NewPlaces);
