# FridgeSense

Search for recipes from ingredients in your Fridge!

FridgeSense is a responsive web application that helps you figure out what to cook based on what you already have in your kitchen. 
Simply input your ingredients, and the app will generate recipe ideas, tell you what you are missing, and link you directly to the cooking instructions.

## Features

*   **Smart Ingredient Tracking:** Add and remove ingredients dynamically, which are displayed as interactive tags.
*   **Persistent Storage:** Automatically saves your fridge inventory to your browser's local storage, so your list is still there if you refresh the page.
*   **Recipe Generation:** Fetches up to 6 customized recipe ideas based on your inputted ingredients.
*   **Smart Grocery Lists:** Compares your fridge inventory against the recipe and displays a list of the exact "missed ingredients" you still need to buy.
*   **Direct Recipe Links:** Provides a direct link to open the full recipe instructions in a new tab.


## Tech Stack

*   **Frontend:** HTML5, standard CSS3, and Vanilla JavaScript.
*   **API:** [Spoonacular Recipe API](https://spoonacular.com/food-api).

## Setup and Installation

To run this project locally, you will need a free API key from Spoonacular.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/fridgesense.git](https://github.com/yourusername/fridgesense.git)
    cd fridgesense
    ```

2.  **Get an API Key:**
    *   Go to the Spoonacular API website and sign up for a free account.
    *   Copy your API Key.

3.  **Configure your API Key:**
    *   Create a new file in the root directory named `config.js`.
    *   Add your API key to the file like this:
    ```javascript
    const token = {
        API_TOKEN: "YOUR_SPOONACULAR_API_KEY_HERE"
    };
    ```

4.  **Run the app**

## Usage

1. Type an ingredient you have in your kitchen into the input bar and click "SUBMIT".
2. Repeat for as many ingredients as you have.
3. Click "GENERATE RECIPES".
4. Browse the generated recipe cards, check what missing ingredients you need to buy, and click "View Full Recipe" to start cooking!
