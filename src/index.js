import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box');
const listEl = document.querySelector('.country-list');
const fullInfoEl = document.querySelector('.country-info');


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e){
  e.preventDefault();
  let value = e.target.value.trim();
  if(!value){
    return;
  }

  clearMarkup();

  fetchCountries(value)
    .then(data => {
      if (data.length === 1) {
        fullInfoEl.insertAdjacentHTML('beforeend', createMarkup(data));
      }else if(data.length > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else {
        listEl.insertAdjacentHTML('beforeend', createMarkup(data));
      }
    })
    .catch((error) => {
      if (error === 404) {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      } else {
        console.log(error.message);
      }
    });
}

function createMarkup (arr){
  if(arr.length === 1){
    return arr.map(({name:{official}, capital, population, flags:{svg}, languages})=>
    `<h2>${official}</h2>
    <img src="${svg}" alt="${official}">
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages).join(' ')}</p>`).join('');
  } 
  return arr.map(({name:{official}, capital, population, flags:{svg}, languages})=> 
  `<li class='js-item'>
      <img src="${svg}" alt="${official}">
      <h2>  ${official}</h2>
    </li>`).join('');
}

function clearMarkup(){
  listEl.innerHTML = '';
  fullInfoEl.innerHTML = '';
}