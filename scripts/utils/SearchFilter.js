// Responsible for filtering recipes based on search terms and tags.
export class SearchFilter {
    constructor(dataRecipes) {
        this.fullRecipesData = dataRecipes;
        this.recipesWithTag = [];
        this.recipesWithTerms = [];
    }

    /**
     * Filter a list of recipes based on a search term.
     *
     * @param {Array} recipesList - The list of recipes to filter.
     * @param {string} searchTerm - The search term entered in a search bar.
     * @returns {Array} - An array of recipes that match the search term.
     */
    filterWithTerms(recipesList, searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        let addedRecipes = new Set();

        // Filter recipes based on the search term in name and description.
        recipesList.filter(recipe => {
            const nameLowerCase = recipe.name.toLowerCase();
            const descriptionLowerCase = recipe.description.toLowerCase();

            if (nameLowerCase.includes(searchTerm) || descriptionLowerCase.includes(searchTerm)) {
                addedRecipes.add(recipe);
            }
        });

        // Filter recipes based on the search term in ingredients.
        recipesList.filter(recipe => {
            const foundInIngredients = recipe.ingredients.some(ingredient => {
                const ingredientToLowerCase = ingredient.ingredient.toLowerCase();
                return ingredientToLowerCase.includes(searchTerm);
            });

            if (foundInIngredients) {
                addedRecipes.add(recipe);
            }
        });

        let recipesFound = Array.from(addedRecipes);

        // Update 'recipesWithTerms'  with the filtered results.
        this.recipesWithTerms = recipesFound;

        return recipesFound;
    }

    /**
     * Filter a list of recipes based on an array of search tags. Returns recipes that match all provided tags.
     *
     * @param {Array} recipesList - The list of recipes to filter.
     * @param {Array} searchTags - An array of tags to filter recipes by.
     * @returns {Array} - An array of recipes that match all the provided tags.
     */
    filterWithTags(recipesList, searchTags) {
        let recipesFound = [];
        let recipesToFilter = recipesList;

        if (searchTags.length > 0) {
            for (let recipe of recipesToFilter) {
                let allTagsFound = true;

                for (let searchTag of searchTags) {
                    let tagFoundInRecipe = false;
                    const searchTagToLowerCase = searchTag.toLowerCase();

                    for (let ingredient of recipe.ingredients) {
                        const item = ingredient.ingredient.toLowerCase();
                        if (item.includes(searchTagToLowerCase)) {
                            tagFoundInRecipe = true;
                            break;
                        }
                    }

                    for (let ustensil of recipe.ustensils) {
                        if (ustensil.toLowerCase().includes(searchTagToLowerCase)) {
                            tagFoundInRecipe = true;
                        }
                    }

                    if (recipe.appliance.toLowerCase().includes(searchTagToLowerCase)) {
                        tagFoundInRecipe = true;
                    }

                    if (!tagFoundInRecipe) {
                        allTagsFound = false;
                        break;
                    }
                }

                if (allTagsFound) {
                    recipesFound.push(recipe);
                }
            }
        }

        this.recipesWithTag = recipesFound;

        return recipesFound;
    }

    /**
     * Search for recipes based on search terms and tags.
     * @param {string} searchTerms - The search terms to filter recipes by.
     * @param {string[]} searchTags - The tags to filter recipes by.
     * @returns {Array} An array of recipes matching the provided search criteria.
     */
    search(searchTerms, searchTags) {
        // Filter recipes based on tags
        let filteredWithTags = this.filterWithTags(this.fullRecipesData, searchTags);

        // Filter recipes based on terms
        let filteredByTerms = this.filterWithTerms(this.fullRecipesData, searchTerms);

        // If both tag and term filters are empty, return the full list
        // Or if searchTerms exist and no recipes are found, return an empty array
        if (this.recipesWithTag.length === 0 && this.recipesWithTerms.length === 0) {
            if (searchTerms.length === 0) {
                return this.fullRecipesData;
            } else {
                return [];
            }
        }

        // If only the tag filter has recipes
        if (this.recipesWithTag.length > 0 && this.recipesWithTerms.length === 0) {
            return filteredWithTags;
        }

        // If only the term filter has recipes
        if (this.recipesWithTag.length === 0 && this.recipesWithTerms.length > 0) {
            return filteredByTerms;
        }

        // If both tag and term filters have recipes
        return this.recipesWithTag.filter(tagRecipe => {
            return this.recipesWithTerms.some(termRecipe => termRecipe.id === tagRecipe.id);
        });
    }
}
