import React, { Component } from 'react';
import Visit from './Visit';
import { TransitionGroup } from 'react-transition-group';

export default class VisitsCollection extends Component{
  constructor(props){
    super(props);
    this.visits = this.visits.bind(this);
  }
  visits(){
    if(this.props.visits.length <1) return null;
    return this.props.visits.map(visit => <Visit key={visit._id} visit={visit} />)
  }

  render(){
    return(
      <div>
        <TransitionGroup>
          {this.visits()}
        </TransitionGroup>
      </div>
    );
  }
}
