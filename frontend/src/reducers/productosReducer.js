import {LOAD_PRODUCTOS} from '../constReducers/productosConsts';

export default function productosReducer(state=[],action){
  switch(action.type){
    case LOAD_PRODUCTOS:
      return action.productos;
    default:
      return state;
  }
}
