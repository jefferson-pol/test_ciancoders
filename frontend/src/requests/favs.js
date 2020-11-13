import config from '../config/secrets';

export function add(jwt,placeId){
  const data = {
    '_place':placeId
  };
  return fetch(config.url+'/favorites',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+jwt
    }
  }).then(response => response.json()).catch(console.log);
}
