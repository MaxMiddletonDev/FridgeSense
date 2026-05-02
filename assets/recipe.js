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

        const data = await response.json();

        const detailedRecipes = await Promise.all(
            data.map(async (recipe) => {
                const detailUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${token.API_TOKEN}`;
                const detailResponse = await fetch(detailUrl);
                const details = await detailResponse.json();

                return { 
                    ...details, 
                    missedIngredients: recipe.missedIngredients 
                };
            })
        );

        recipes.innerHTML = detailedRecipes.map(recipe => {
            const missingItems = recipe.missedIngredients.map(item => 
                `<li>${item.name}</li>`
            ).join('');

            const missingSection = recipe.missedIngredients.length > 0 
                ? `<div class="missing-ingredients"><strong>Still need to buy:</strong><ul>${missingItems}</ul></div>`
                : `<div class="missing-ingredients" style="color: green;"><strong>You have all the ingredients!</strong></div>`;

            return `
                <div class="recipe-card">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    ${missingSection}
                    <br>
                    <a href="${recipe.sourceUrl}" target="_blank" class="recipe-link">View Full Recipe &rarr;</a>
                </div>
            `;
        }).join('');
    } catch(error) {
        console.error(error);
    }
}