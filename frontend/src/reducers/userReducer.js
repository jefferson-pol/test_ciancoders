import { LOG_IN,LOAD_USER,LOG_OUT } from '../constReducers/userConsts';

export default function userReducer(state = {name: 'Jefferson'}, action){
  switch(action.type){
    case LOG_IN:
      return Object.assign({},state,{ jwt: action.jwt})
    case LOAD_USER:
      return Object.assign({},state,{
        name: action.user.name,
        _id: action.user_id,
        email: action.user.email
      })
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
