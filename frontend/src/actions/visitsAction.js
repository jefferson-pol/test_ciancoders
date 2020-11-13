import { ADD_VISIT, LOAD_VISIT } from '../constReducers/visitsConsts';
import * as requests from '../requests/visits';

export function addVisitSuccess(visit){
  return {type: ADD_VISIT, visit};
}

export function loadAllSuccess(visits){
  return {type: LOAD_VISIT, visits};
}

export function loadAllForPlace(slug){
  return (dispatch,getState) =>{
    requests.getAllForPlaces(slug).then(result =>{
      dispatch(loadAllSuccess(result));
    }).catch(console.log);
  }
}

export function addVisit(place,observation,reaction){
  return(dispatch,getState)=>{
    let user = getState().user;
    if(!user) return null;

    requests.add(user.jwt,place,observation,reaction).then(result =>{
      dispatch(addVisitSuccess(result))
      console.log(result);
    }).catch(console.log);
  }
}
