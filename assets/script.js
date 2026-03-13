const inputForm = document.getElementById("inputForm")
const content = document.getElementById("content");
const ingredients = [];

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    inputData();
});

async function inputData() {
    const ingredient = document.getElementById("input").value.trim();

    try {
        if(ingredients.includes(ingredient)) {
            console.log("Duplicate Detected")
            return
        }
        if(!ingredient) {
            return
        }
        ingredients.push(ingredient)
        console.log(ingredients)
        refreshIngredient();

    } catch (error) {
        content.innerHTML = "";
    }
}

async function removeIngredient(index) {
    ingredients.splice(index, 1);
    refreshIngredient();
}

async function refreshIngredient() {
    content.innerHTML = ingredients.map((item, index) => `
        <span class="tag">
            ${item} <button class="delete-btn" onclick="removeIngredient(${index})">&times;</button>
        </span>
    `).join('');
}