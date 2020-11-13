import React, { Component } from 'react';
import Modal from 'react-modal';
import Container from '../Container';
import Title from '../Title';
import { yellow700 } from 'material-ui/styles/colors';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import EmojiPicker from './emoji_picker/EmojiPicker';
export default class VisitModal extends Component{
  constructor(props){
    super(props);
    this.state={open: false};
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submit = this.submit.bind(this);
    this.emojiSelected = this.emojiSelected.bind(this);
  }
  openModal(){
    this.setState({open: true});
  }
  closeModal(){
    this.setState({ open: false});
  }
  submit(){
    const observation = this.refs.observationField.getValue();
    this.props.onSubmit(observation,this.state.reaction);
    // this.refs.observationField.setValue("");
    this.closeModal();
  }
  emojiSelected(reaction){
    console.log(reaction);
    this.setState({reaction})
  }

  render(){
    return (
      <div>
        <Modal
          isOpen={this.state.open}
          ariaHideApp={false}
        >
          <Container>
            <div style={{'textAlign':'left','marginTop':'2em'}}>
              <header>
                <Title />
                <h1>
                  Cuentanos de tu visita a
                  <span style={{'backgroundColor':yellow700,'margin':'0 0.3em'}}>
                    {this.props.place.title}
                  </span>
                </h1>
              </header>
              <div className="row">
                <div className="col-xs-4 col-sm-2 col-lg-1">
                  <EmojiPicker onSelect={this.emojiSelected} />
                </div>
                <div className="col-xs">
                  <TextField
                    floatingLabelText="Cuéntanos qué te pareció este lugar"
                    ref="observationField"
                    multiLine={true}
                    style={{'width':'100%'}}
                  />
                  <div style={{'marginTop': '1em'}}>
                    <RaisedButton label="Guardar" secondary={true} onClick={this.submit} />
                    <FlatButton label="Cancelar" style={{'marginLeft':'2em'}} onClick={this.closeModal} />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Modal>
      </div>
    )
  }
}
