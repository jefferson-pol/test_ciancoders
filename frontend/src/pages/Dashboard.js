import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Container from "../components/Container";
import PlaceHorizontal from "../components/places/PlaceHorizontal";

import * as actions from '../actions/productosActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.loadCatalogo();
  }
  loadCatalogo() {
    this.props.dispatch(actions.getCatalogoUsuario());
  }
  productos() {
    return this.props.productos.map((producto, index) => {
      return <PlaceHorizontal key={index} producto={producto} />;
    });
  }
  render() {
    return (
      <div>
        <Link to="/new">
          <FloatingActionButton className="FAB" secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <Container>
          <div className="row">
            <div className="col-xs-12 col-md-2" style={{ textAlign: "left" }}>
              <FlatButton label="Catalogo" />
            </div>
            <div className="col-xs-12 col-md-10">
              <h1>Catalog de productos</h1>
              {this.productos()}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return{
    productos: state.productos
  }
}

export default connect(mapStateToProps)(Dashboard);
