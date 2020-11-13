import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

export default class FadeAndScale extends React.Component{
  render(){
    return(
      <div className={this.props.className}>
        <CSSTransition
          classNames='fade-scale'
          timeout={300}
          in={this.props.in}
          unmountOnExit={true}
          >
          {this.props.children}
        </CSSTransition>
      </div>
    );
  }
}
