import { SearchFilter } from './SearchFilter.js';
import { displayCounter, displayFilters, displayNoResult, displayRecipes, removeNoResultMessage } from './display.js';
import { fetchData } from './fetch.js';

const dataRecipes = await fetchData();
let recipesFilteredBySearch = [];


/**
 * Updates the view by displaying filtered recipes, filters, and counter.
 */
export function updateView() {
    let recipesFiltered = recipesFilteredBySearch;
    const $recipesWrapper = document.querySelector('.recipes__wrapper');
    const $filtersWrapper = document.querySelector('.filters__wrapper');

    // Display recipes, filters, and counter
    displayRecipes($recipesWrapper, recipesFiltered);
    displayFilters($filtersWrapper, recipesFiltered);
    displayCounter(recipesFiltered);
}


/**
 * Updates the search results based on the input value and tags.
 * @param {string} inputValue - The value entered in the search input.
 * @param {Array<string>} tags - The tags selected for filtering.
 */
export function updateSearch(inputValue, tags) {
    removeNoResultMessage();
    const searchFilter = new SearchFilter(dataRecipes);

    // Apply search terms and tags to filter the data
    searchFilter.search(inputValue, tags);
    recipesFilteredBySearch = searchFilter.search(inputValue, tags);

    let recipesWithTerms = searchFilter.filterWithTerms(recipesFilteredBySearch, inputValue);
    if (recipesWithTerms.length === 0 || recipesFilteredBySearch.length === 0) {
        displayNoResult(inputValue);
    }
}
