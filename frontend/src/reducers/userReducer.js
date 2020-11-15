import { LOG_IN,LOAD_USER,LOG_OUT } from '../constReducers/userConsts';

export default function userReducer(state = {name: 'Jefferson'}, action){
  switch(action.type){
    case LOG_IN:
      return Object.assign({},state,{ token: action.token})
    case LOAD_USER:
      return Object.assign({},state,action.user)
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
