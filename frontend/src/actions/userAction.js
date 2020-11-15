import { LOG_IN, LOAD_USER, LOG_OUT } from '../constReducers/userConsts';

export function login(token){
  return { type: LOG_IN,token }
}

export function loadUser(user){
  return { type: LOAD_USER, user }
}

export function logout(){
  return { type: LOG_OUT }
}
