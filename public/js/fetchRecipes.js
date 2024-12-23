async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear previous recipes

    recipes.forEach((recipe) => {
      const recipeItem = document.createElement("li");
      recipeItem.textContent = `${
        recipe.name
      } - Ingredients: ${recipe.ingredients.join(", ")}`;
      recipeList.appendChild(recipeItem);
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
