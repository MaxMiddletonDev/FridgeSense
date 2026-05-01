import { ingredients } from './ingredient.js'
const generateBtn = document.getElementById("generate")

generateBtn.addEventListener("click", function(e) {
    e.preventDefault();
    fetchData();
});

export async function fetchData () {
    const recipes = document.getElementById("recipes");
    const ingredientList = ingredients.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=2&apiKey=${token.API_TOKEN}`;

    try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)

        const detailedRecipes = await Promise.all(
            data.map(async (recipe) => {
                const detailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${token.API_TOKEN}`;
                const detailResponse = await fetch(detailUrl);
                return await detailResponse.json();
            })
        );

        recipes.innerHTML = detailedRecipes.map(recipe => `
            <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <br>
            <a href="${recipe.sourceUrl}" target="_blank" class="recipe-link">VIEW FULL RECIPE</a>
            </div>
        `).join('');

    } catch(error) {
        console.error(error);
    }
}