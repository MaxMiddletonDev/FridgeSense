const inputForm = document.getElementById("inputForm")
const content = document.getElementById("content");
const clearButton = document.getElementById("clearAll");
export const ingredients = JSON.parse(localStorage.getItem("fridgeIngredients")) || [];

import { fetchData } from './recipe.js';

refreshIngredient();

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    inputData();
});

clearButton.addEventListener("click", function(e) {
    e.preventDefault();
    clearData();
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
window.removeIngredient = removeIngredient;

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

async function clearData() {
    const recipesContainer = document.getElementById("recipes");
    if (recipesContainer) {
        recipesContainer.innerHTML = "";
    }

    const contentContainer = document.getElementById("content");
    if (contentContainer) {
        contentContainer.innerHTML = "";
    }

    const inputField = document.getElementById("input");
    if (inputField) {
        inputField.value = "";
    }

    ingredients.length = 0;
}