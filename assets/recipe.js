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

        recipes.innerHTML = data.map(recipe => `
            <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            </div>
        `).join('');

    } catch(error) {
        console.error(error);
    }
}