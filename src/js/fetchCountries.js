import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const END_POINT = 'fields=name,flags,languages,capital,population';

export function fetchCountries(name){
 return fetch(`${BASE_URL}${name}?${END_POINT}`).then((resp) => {
    if(!resp.ok){
      throw new Error(resp.statusText);
    }
    return resp.json();
  })
}




