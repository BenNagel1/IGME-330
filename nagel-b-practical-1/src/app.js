// TODO: Import the function(s) from dataFetcher.js
// TODO: Import the function(s) from uiHandler.js

import { fetchData } from "./dataFetcher.js";
import { renderList, populateDropdown } from "./uiHandler.js";

populateDropdown();

document.querySelector('#build-button').addEventListener('click', () => {
    const selectedCategory = document.querySelector('#category-select').value;

    fetchData('data/parodyData.json', document.querySelector('#category-select').value, (moviesNames) => {
        const catListContainer = document.querySelector('#data-list');
        catListContainer.innerHTML = renderList(moviesNames);
   });
    // TODO: Call fetchData to retrieve data from 'data/parodyData.json' 
    // for the selectedCategory. Then, in the callback function, use renderList 
    // to display the data in #data-list div.  See example usage in practical 
    // instructions.
});
