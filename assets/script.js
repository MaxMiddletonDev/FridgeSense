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
        if(ingredients.includes(ingredient)) {
            console.log("Duplicate Detected")
            return
        }
        if(!ingredient) {
            return
        }
        ingredients.push(ingredient)
        console.log(ingredients)
        content.innerHTML = ingredients.map(item => `<span class="tag">${item}</span>`).join('');

    } catch (error) {
        content.innerHTML = "";
    }
}