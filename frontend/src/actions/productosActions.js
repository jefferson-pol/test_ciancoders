import {LOAD_PRODUCTOS} from '../constReducers/productosConsts';
import * as requests from '../requests/productos';

export function getProductos(productos){
  return { type: LOAD_PRODUCTOS, productos};
}

export function getCatalogo(){
  return (dispatch,getState)=>{
    requests.getProductos().then(result=>{
      dispatch(getProductos(result));
    }).catch(e =>{
      console.log(e);
    })
  }
}
