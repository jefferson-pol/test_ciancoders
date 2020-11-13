import * as requests from '../requests/favs';
import { ADD_FAVORITE } from '../constReducers/favsConsts';

export function addSuccess(place){
  return { type: ADD_FAVORITE, place};
}

export function add(placeId){
  return(dispatch,getState)=>{
    let user = getState().user;

    if(!user) return Promise.reject();

    requests.add(user.jwt,placeId).then(result =>{
      console.log(result);
      dispatch( addSuccess(placeId));
    }).catch(console.log);
  }
}
