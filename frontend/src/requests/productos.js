import config from '../config/secrets';

function getProductos(){
  return fetch(config.url+"/producto/get_productos/").then(data =>{
    return data.json();
  }).catch(console.log)
}

function getCataloProductos(token){
  return fetch(config.url+"/producto/catalogo_productos/",{
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Token ' + token
    }
  }).then(data =>{
    return data.json();
  }).catch(console.log)
}
export { getProductos, getCataloProductos };
