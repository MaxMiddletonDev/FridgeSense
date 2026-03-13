const inputForm = document.getElementById("inputForm")
const ingredients = [];

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    inputData();
});

async function inputData() {
    const ingredient = document.getElementById("input").value.trim();
    const content = document.getElementById("content");

    try {
        ingredients.push(ingredient)
        console.log(ingredients)
        content.innerHTML = `
            <p>${ingredients}</p>
        `;

    } catch (error) {
        content.innerHTML = "";
    }
}