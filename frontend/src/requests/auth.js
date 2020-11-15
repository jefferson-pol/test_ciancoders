import config from '../config/secrets';

function login(credentials){
    return fetch(config.url+"/user/get_token/",{
        method: 'POST',
        body: JSON.stringify(credentials),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response =>{
        return response.json();
    })
}

function signUp(credentials){
    return fetch(config.url+"/user/",{
        method: 'POST',
        body: JSON.stringify(credentials),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response =>{
        return response.json();
    })
}

export {login, signUp};
