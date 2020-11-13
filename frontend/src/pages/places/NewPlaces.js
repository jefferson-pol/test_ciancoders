import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  push } from 'connected-react-router';
import { TextField, RaisedButton, Card } from 'material-ui';
import Swal from 'sweetalert2';
import Title from '../../components/Title';
import Container from '../../components/Container';
import * as requests from '../../requests/places';
import Uploader from '../../components/uploader/Uploader';

const textStyles = {
  'width': '100%'
}

class NewPlaces extends Component{
  constructor(props){
    super(props);

    this.state={uploading:false}

    this.createPlace = this.createPlace.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  createPlace(){
    const data = {
      title: this.refs.titleField.getValue(),
      address: this.refs.addressField.getValue(),
      description: this.refs.descriptionField.getValue()
    }

    if(data['title'] === "" || data['address'] === "" || data['description'] == ""){
      Swal.fire(
        'Datos Inválidos',
        'Toda la información debe ser llenada',
        'error'
      );
      return ""
    }

    if(this.state.avatar) data.avatar = this.state.avatar;
    if(this.state.cover) data.cover = this.state.cover;
    this.setState({uploading:true});
    requests.createPlace(data,this.props.user.jwt).then(data=>{
      console.log(data);
      this.setState({uploading:false});
      this.props.dispatch(push('/lugares/'+data.slug));
    }).catch(console.log);

  }
  getFile(type,file){
    let state={};
    state[type]=file;
    this.setState(state);
    console.log(this.state);
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
                floatingLabelText="Nombre del negocio"
                ref="titleField"
                style={textStyles}
              />
              <TextField
                floatingLabelText="Dirección"
                ref="addressField"
                style={textStyles}
              />
              <TextField
                floatingLabelText="Descripción del negocio"
                ref="descriptionField"
                multiLine={true}
                style={textStyles}
              />
              <div style={{'marginTop':'1em'}}>
                <Uploader label="Subir Avatar" type="avatar" getFile={this.getFile}/>
              </div>
              <div style={{'marginTop':'1em'}}>
                <Uploader label="Subir Cover" type="cover" getFile={this.getFile}/>
              </div>
            </div>
            <div style={{'textAlign':'right','marginTop':'1em'}}>
              <RaisedButton
                label='Guardar'
                onClick={this.createPlace}
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
