import {LOAD_PRODUCTOS} from '../constReducers/productosConsts';
import * as requests from '../requests/productos';
import Swal from 'sweetalert2';


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

export function getCatalogoUsuario(){
  return (dispatch,getState)=>{
    let user = getState().user;
    requests.getCataloProductos(user.token).then(result=>{
      console.log(result);
      dispatch(getProductos(result));
      if(result[0] == '' || result[0] == null){
        Swal.fire(
          'Ok',
          'No has creado productos para tu catalogo',
          'success'
        )
      }
    }).catch(e =>{
      Swal.fire(
        'Error',
        'Ocurrio un error al obtener tu catalogo',
        'error'
      );
    })
  }
}
