import React, { Component } from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';


export default class PlaceHorizontal extends Component {
  render() {
    return (
      <Card style={{ marginTop: "1em", overflow: "hidden" }}>
        <div className="row">
          <div className="col-xs" style={{ textAlign: "left" }}>
            <CardTitle title={this.props.producto.nombre}></CardTitle>
            <div className="row middle-xs">
              <div className="col-xs-6 col-sm-8 col-lg-9">
                <CardText>Precio Q {this.props.producto.precio}</CardText>
                <CardText>Cantidad {this.props.producto.cantidad}</CardText>
              </div>
              <div className="col-xs">
                <CardActions>
                  {/* <Link to={"/lugares/" + this.props.producto.id}>
                    <FlatButton label="Ver más" />
                  </Link> */}
                </CardActions>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
