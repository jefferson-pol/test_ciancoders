import config from '../config/secrets';

function getProductos(){
  return fetch(config.url+"/producto/get_productos/").then(data =>{
    return data.json();
  }).catch(console.log)
}

export { getProductos };
