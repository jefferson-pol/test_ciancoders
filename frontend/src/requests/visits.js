import config from '../config/secrets';

export function  getAllForPlaces(slug){
  return fetch(config.url+'/places/'+slug+'/visits')
    .then(response => response.json()).catch(console.log);
}

export function add(jwt,place,observation,reaction){
  const data = {
    _place: place._id,
    observation,
    reaction
  }

  return fetch(config.url+'/places/'+place.slug+'/visits',{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+jwt
    }
  }).then(response => response.json()).catch(console.log);
}


