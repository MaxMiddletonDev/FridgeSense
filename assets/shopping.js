import { lastFetchedBasicRecipes } from './recipe.js';

const shoppingListButton = document.getElementById("shoppingListButton");
const shoppingListModal = document.getElementById("shoppingListOverall"); 
const closeShoppingListButton = document.getElementById("closeShoppingListButton");
const shoppingListItemsList = document.getElementById("shoppingListItems");
const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

window.addMissingToList = function(recipeId) {
    const recipe = lastFetchedBasicRecipes.find( r => r.id === recipeId);
    if (!recipe) return;

    let addedSomething = false;

    recipe.missedIngredients.forEach(item => {
        const itemName = item.name.toLowerCase();
        if (!shoppingList.includes(itemName)) {
            shoppingList.push(itemName);
            addedSomething = true;
        }
    });

    if (addedSomething) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }

    const button = document.getElementById(`addButton-${recipeId}`);
    if (button) {
        button.innerHTML = "Added to List";
        button.classList.add("added");
    }
};

window.removeFromShoppingList = function(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    renderShoppingListModal();
};

function renderShoppingListModal() {
    if (shoppingList.length === 0) {
        shoppingListItemsList.innerHTML = `<li class="emptyListMessage">EMPTY</li>`;
        return;
    }

    shoppingListItemsList.innerHTML = shoppingList.map((item, index) => `
        <li class="shoppingListItem">
            <span>${item}</span>
            <button class="removeItemButton" onclick="removeFromShoppingList(${index})">Remove</button>
        </li>
    `).join('');
}

shoppingListButton.addEventListener("click", () => {
    renderShoppingListModal();
    shoppingListModal.classList.add("show");
});

closeShoppingListButton.addEventListener("click", () => {
    shoppingListModal.classList.remove("show");
});

shoppingListModal.addEventListener("click", (e) => {
    if (e.target === shoppingListModal) {
        shoppingListModal.classList.remove("show");
    }
});