const recipeBoxTemplate = document.querySelector("[data-render-recipe]");

async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear previous recipes

    const addRecipeBox = recipeBoxTemplate.content.cloneNode(true);
    recipeList.appendChild(addRecipeBox);

    recipes.forEach((recipe) => {
      for (i = 0; i < recipe.ingredients.length - 1; i++) {
        for (const [key, value] of Object.entries(recipe.ingredients[i])) {
          // let ingredient = document.createElement("p");
          // ingredient.innerText = `${key} : ${value}`;
          // ingredientContainer.appendChild(ingredient);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
