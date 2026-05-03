import { ingredients } from './ingredient.js'
const generateBtn = document.getElementById("generate")

generateBtn.addEventListener("click", function(e) {
    e.preventDefault();
    fetchData();
});

export async function fetchData () {
    const recipes = document.getElementById("recipes");
    const ingredientList = ingredients.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=6&apiKey=${token.API_TOKEN}`;

    try {
        const response = await fetch(url)

        if (!response.ok) {
            if (response.status === 402) {
                throw new Error("API daily limit reached. Please try again tomorrow.");
            } else {
                throw new Error(`API returned status: ${response.status}`);
            }
        }

        const basicRecipes = await response.json();

        const recipeIds = basicRecipes.map(recipe => recipe.id).join(',');

        const bulkUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${token.API_TOKEN}`;
        const bulkResponse = await fetch(bulkUrl);
        if (!bulkResponse.ok) throw new Error("Bulk Information API failed");
        const detailedRecipes = await bulkResponse.json();

        recipes.innerHTML = detailedRecipes.map((recipe, index) => {
            const matchingBasicRecipe = basicRecipes.find(b => b.id === recipe.id);
            const missed = matchingBasicRecipe ? matchingBasicRecipe.missedIngredients : [];

            const missingItems = missed.map(item => `<li>${item.name}</li>`).join('');
            
            const missingSection = missed.length > 0 
                ? `<div class="missing-ingredients"><strong>Still need to buy:</strong><ul>${missingItems}</ul></div>`
                : `<div class="missing-ingredients" style="color: green;"><strong>You have all the ingredients!</strong></div>`;

            return `
                <div class="recipe-card">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    ${missingSection}
                    <br>
                    <a href="${recipe.sourceUrl}" target="_blank" class="recipe-link">View Full Recipe</a>
                </div>
            `;
        }).join('');

    } catch(error) {
        console.error("Error fetching recipes:", error);
    }
}