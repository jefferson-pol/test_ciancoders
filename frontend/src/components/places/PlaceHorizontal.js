import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import { FlatButton } from 'material-ui';
import {avatar_default} from '../../Variables';
import { Link } from 'react-router-dom';


export default class PlaceHorizontal extends Component{
    render(){        
        return(
            <Card style={{'marginTop':'1em','overflow':'hidden'}}>

                <div className="row">
                    <div className="PlaceH-avatar">
                        <img src={this.props.place.avatarImage ? this.props.place.avatarImage:avatar_default} />
                    </div>
                    <div  className="col-xs" style={{'textAlign':'left'}}>
                        <CardHeader 
                            title={this.props.place.title}
                            subtitle={this.props.place.address}
                        />
                        <div className="row middle-xs">
                            <div className="col-xs-6 col-sm-8 col-lg-9" >
                                <CardText>{this.props.place.description}</CardText>
                            </div>
                            <div className="col-xs">
                                <CardActions>
                                    <Link to={"/lugares/"+this.props.place.slug}>
                                        <FlatButton label="Ver más" />
                                    </Link>
                                </CardActions>
                            </div>
                        </div>
                    </div>
                </div>

            </Card>
        )
    }
}