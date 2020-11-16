import React from 'react';
import { Card, CardText,CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FadeAndScale from '../animations/FadeAndScale';


export default class PlaceCard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        show: true
      }
  }

  render(){
    return(
      <FadeAndScale className="col-xs-12 col-sm-3"  in={this.props.in}>
        <div >
          <Card style={{'marginTop': '10px'}}>
            <CardText style={{'fontWeight':'bold'}}>{this.props.producto.nombre}</CardText>
            <CardText>Q {this.props.producto.precio}</CardText>
            <CardActions style={{'textAlign': 'right'}}>
              <FlatButton secondary={true} label="Agregar" />
            </CardActions>
          </Card>
        </div>
      </FadeAndScale>
    );
  }
}
