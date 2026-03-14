const inputForm = document.getElementById("inputForm")
const content = document.getElementById("content");
const ingredients = JSON.parse(localStorage.getItem("fridgeIngredients")) || [];

refreshIngredient();

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    inputData();
});

async function inputData() {
    const inputField = document.getElementById("input");
    const ingredient = inputField.value.trim();

    try {
        if(ingredients.includes(ingredient)) {
            console.log("Duplicate Detected")
            return
        }
        if(!ingredient) {
            return
        }
        ingredients.push(ingredient)
        save();
        console.log(ingredients)
        refreshIngredient();
        inputField.value = "";

    } catch (error) {
        content.innerHTML = "";
    }
}

async function removeIngredient(index) {
    ingredients.splice(index, 1);
    save();
    refreshIngredient();
}

async function refreshIngredient() {
    content.innerHTML = ingredients.map((item, index) => `
        <span class="tag">
            ${item} <button class="delete-btn" onclick="removeIngredient(${index})">&times;</button>
        </span>
    `).join('');
}

async function save() {
    localStorage.setItem("fridgeIngredients", JSON.stringify(ingredients));
}