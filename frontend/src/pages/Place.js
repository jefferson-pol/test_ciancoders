import React, { Component } from "react";
import { Card } from "material-ui/Card";
import { FloatingActionButton } from 'material-ui';
import Star  from 'material-ui/svg-icons/toggle/star';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { avatar_default, cover_default } from "../Variables";
import { getPlace } from "../requests/places";
import Container from "../components/Container";
import VisitForm from "../components/visits/VisitForm";
import * as visitsActions from '../actions/visitsAction';
import * as favoritesActions from '../actions/favsActions';
import VisitsCollection from "../components/visits/VisitCollection";
import { yellow700 } from "material-ui/styles/colors";

class Place extends Component {
  constructor(props) {
    super(props);

    const slug = props.match.params.slug;
    this.loadPlace(slug);

    this.state = {
      place: {},
    };
    this.fav = this.fav.bind(this);
  }
  loadPlace(slug) {
    this.props.dispatch(visitsActions.loadAllForPlace(slug));
    getPlace(slug).then((json) => {
      this.setState({
        place: json,
      });
    });
  }

  fav(){
    this.props.dispatch(favoritesActions.add(this.state.place._id));
  }

  favBtn(){
    return(
      <FloatingActionButton onClick={this.fav} backgroundColor={yellow700} className="Fav-btn">
        <Star />
      </FloatingActionButton>
    )
  }

  render() {
    const { place } = this.state;
    const cover = this.state.place.coverImage ? this.state.place.coverImage : cover_default;
    return (
      <div className="Place-container">
        <header
          className="Place-cover"
          style={{ backgroundImage: "url(" + cover + ")" }}
        ></header>
        <Container>
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <Card className="Place-card">
                {this.favBtn()}
                <div className="row">
                  <div className="col-xs-12 col-sm-2 col-lg-2">
                    <img
                      src={place.avatarImage ? place.avatarImage : avatar_default}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  <div className="col-xs">
                    <h1>{place.title}</h1>
                    <address>{place.address}</address>
                    <p>{place.description}</p>
                  </div>
                </div>
                <div style={{'marginTop':'1em'}}>
                  <VisitForm place={place} />
                </div>
              </Card>
            </div>
            <div className="col-xs">
              <VisitsCollection visits={this.props.visits} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

function mstp(state,ownProps){
  return {
    visits:state.visits,
    favorites: state.favorites
  }
}
export default connect(mstp)(withRouter(Place));
