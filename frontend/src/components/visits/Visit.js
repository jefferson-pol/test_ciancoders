import React, { Component } from 'react';
import {Card, CardText, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import {avatar_default} from '../../Variables';
import FadeAndScale from '../animations/FadeAndScale';
import Emoji from './emoji_picker/Emoji';
import { relationInverse } from './emoji_picker/emoijs';

class Visit extends Component {
  getShortCode(){
    if(!this.props.visit.reaction) return relationInverse["love"];
    return relationInverse[this.props.visit.reaction]
  }
  render() {
    return (
      <FadeAndScale in={this.props.in}>
        <div>
          <Card style={{'textAlign':'left','marginTop':'1em'}}>
            <div className="row middle-xs">
              <div className="col-xs">
                <CardHeader title="Uriel" avatar={avatar_default} subtitle={this.props.visit.observation}>
                </CardHeader>
              </div>
              <div className="col-xs-2 col-sm-1">
                <Emoji code={this.getShortCode()} />
              </div>
            </div>
          </Card>
        </div>
      </FadeAndScale>
    );
  }
}

export default Visit;

