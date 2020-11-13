import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
import VisitModal from './VisitModal';
import * as actions from '../../actions/visitsAction';

class VisitForm extends Component{
  constructor(props){
    super(props);
    this.openVisitsModal = this.openVisitsModal.bind(this);
    this.add = this.add.bind(this);
  }

  openVisitsModal(){
    this.refs.modalRef.openModal();
  }

  add(observation, reaction = "love" ){
    this.props.dispatch(actions.addVisit(this.props.place,observation,reaction))
  }

  render(){
    return(
      <div>
        <VisitModal place={this.props.place} ref="modalRef" onSubmit={this.add} />
        <FlatButton
          label="Valorar tu visita al negocio"
          secondary={true}
          onClick={this.openVisitsModal} />
      </div>
    );
  }
}

function mstp(state,ownProps){
  return {
    user: state.user
  }
}

export default connect(mstp)(VisitForm);
