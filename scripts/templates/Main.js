import { displayFilters, displayRecipes } from '../utils/display.js';

// Class representing the main content of the application.
export class Main {
    constructor(recipesData) {
        this.recipesData = recipesData;
    }

    // Create the main content of the application, including filters, tags, and recipes.
    async createMain() {
        const $filtersWrapper = document.createElement('div');
        $filtersWrapper.classList.add('filters__wrapper');

        const $tagsWrapper = document.createElement('div');
        $tagsWrapper.classList.add('tags__wrapper');

        const $recipesWrapper = document.createElement('div');
        $recipesWrapper.classList.add('recipes__wrapper');

        displayFilters($filtersWrapper, this.recipesData);

        displayRecipes($recipesWrapper, this.recipesData);

        return { $filtersWrapper, $tagsWrapper, $recipesWrapper };
    }
}

