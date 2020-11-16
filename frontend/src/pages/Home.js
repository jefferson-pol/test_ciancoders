import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {indigo400} from 'material-ui/styles/colors';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../components/Title';
import Container from '../components/Container';
import PlaceCard from '../components/places/PlaceCard';
import * as actions from '../actions/productosActions';



class Home extends React.Component{

  constructor(props){
    super(props);
    this.loadProductos();
  }

  loadProductos(){
    this.props.dispatch(actions.getCatalogo());
  }

  productos(){
    return this.props.productos.map((producto,index)=>{
      return(
        <PlaceCard key={index} producto={producto} index={index} />
      );
    })
  }

  render(){
    return(
      <section>
        <div className="Header-background">
          <Container>
            <div className="Header-main">
              <Title></Title>
              <Link to="/signup">
                <RaisedButton label="Crear cuenta gratuita" secondary={true} />
              </Link>
              <img className="Header-illustration" src={process.env.PUBLIC_URL + '/images/store.png'} />
            </div>
          </Container>

        </div>
        <div style={{'backgroundColor': indigo400, 'padding': '50px', color: 'white'}}>
          <h3 style={{'fontSize': '24px'}}>Productos Disponibles</h3>
          <TransitionGroup  className="row">
            {this.productos()}
          </TransitionGroup>
        </div>
      </section>
    );
  }

}
function mapStateToProps(state,ownProps){
  return {
    productos: state.productos
  }
}

export default connect(mapStateToProps)(Home)
