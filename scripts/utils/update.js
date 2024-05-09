import { SearchFilter, recipesFiltered } from './SearchFilter.js';
import { displayCounter, displayFilters, displayRecipes } from './display.js';
import { fetchData } from './fetch.js';

const dataRecipes = await fetchData();

/**
 * Display recipes, filters, and a counter based on filtered data
 */
export function updateView() {
    const $recipesWrapper = document.querySelector('.recipes__wrapper');
    const $filtersWrapper = document.querySelector('.filters__wrapper');

    displayRecipes($recipesWrapper, recipesFiltered);
    displayFilters($filtersWrapper, recipesFiltered);
    displayCounter(recipesFiltered);
}

/**
 * Update the search filter based on the input value and tags
 */
export function updateSearch(inputValue, tags) {
    const searchFilter = new SearchFilter(dataRecipes);

    searchFilter.search(inputValue, tags);
}
