import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box')
const listEl = document.querySelector('.country-list')
const fullInfoEl = document.querySelector('.country-info')


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(e){
  e.preventDefault();
  let value = null;
  value = e.target.value.trim();

fetchCountries(value)

.then(data => listEl.insertAdjacentHTML('beforeend', createMarkup(data)))
.then(data => fullInfoEl.insertAdjacentHTML('beforeend', createMarkup(data)))
.catch((error => console.log(error)))
}

function createMarkup (arr){
  if(arr.length === 1){
    listEl.innerHTML = '';
    return arr.map(({name:{official}, capital, population, flags:{svg}, languages})=>
    `<h2><img src="${svg}" alt="${official}">${official}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>`).join('')
  } else if(arr.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return listEl.innerHTML = '';
  }
  return arr.map(({name:{official}, capital, population, flags:{svg}, languages})=> 
  `<li class='js-item'>
      <h2> <img src="${svg}" alt="${official}"> ${official}</h2>
    </li>`).join('')
}


