const recipeBoxTemplate = document.querySelector("[data-render-recipe]");

async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear previous recipes

    recipes.forEach((recipe) => {
      const addRecipeBox = recipeBoxTemplate.content.cloneNode(true);
      addRecipeBox.querySelector("[data-recipe-name]").textContent =
        recipe.name;
      addRecipeBox.querySelector("[data-recipe-type]").textContent =
        recipe.type;
      addRecipeBox.querySelector("[data-recipe-calories]").textContent =
        recipe.calories;
      let ingredientList = addRecipeBox.querySelector(
        "[data-ingredient-container]"
      );
      console.log(recipe);
      for (i = 0; i <= recipe.ingredients.length - 1; i++) {
        let ingredient = document.createElement("p");
        for (const [key, value] of Object.entries(recipe.ingredients[i])) {
          ingredient.innerHTML += ` ${value}`;
        }
        ingredientList.appendChild(ingredient);
        recipeList.appendChild(addRecipeBox);
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
