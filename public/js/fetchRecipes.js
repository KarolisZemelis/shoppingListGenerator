const recipeBoxTemplate = document.querySelector("[data-render-recipe]");
const recipeContainers = document.querySelectorAll("[data-recipe-container]");

const editRecipe = (recipe, name, type, calories, ingredients) => {
  name.innerHTML = `<input type="text" name="ingredientName" value=${recipe.name} data-form-ingredientName />`;
  type.innerHTML = `
  <select name="recipeType" id="recipeType" data-form-type>
    <option value="breakfast" ${
      recipe.type === "breakfast" ? "selected" : ""
    }>Pusryčiai</option>
    <option value="lunch" ${
      recipe.type === "lunch" ? "selected" : ""
    }>Pietūs</option>
    <option value="snack" ${
      recipe.type === "snack" ? "selected" : ""
    }>Užkandis</option>
    <option value="dinner" ${
      recipe.type === "dinner" ? "selected" : ""
    }>Vakarienė</option>
  </select>`;
  calories.innerHTML = `<input type="number" name="recipeCalories" value=${recipe.calories} data-form-calories />`;
  ingredients.forEach((ingredient) => {
    // ingredient.innerHTML =
    console.log(ingredient);
  });
};

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
      const editButton = addRecipeBox.querySelector("[data-edit-button]");
      const deleteButton = addRecipeBox.querySelector("[data-delete-button]");

      for (i = 0; i <= recipe.ingredients.length - 1; i++) {
        let ingredientRow = document.createElement("div");
        ingredientRow.className = "ingredientRow";
        for (const [key, value] of Object.entries(recipe.ingredients[i])) {
          let ingredient = document.createElement("p");
          ingredient.innerHTML += ` ${value}`;
          ingredientRow.appendChild(ingredient);
        }
        ingredientList.appendChild(ingredientRow);
        recipeList.appendChild(addRecipeBox);
      }

      editButton.addEventListener("click", () => {
        let recipeCard = editButton.parentElement.parentElement;
        let name = recipeCard.querySelector("[data-recipe-name]");

        let type = recipeCard.querySelector("[data-recipe-type]");
        console.log(type);
        let calories = recipeCard.querySelector("[data-recipe-calories]");
        let ingredients = recipeCard.querySelectorAll(
          "[data-ingredient-container] p"
        );

        editRecipe(recipe, name, type, calories, ingredients);
      });

      deleteButton.addEventListener("click", () => {
        console.log(`Deleting recipe: ${recipe.name}`);
        // addedRecipe.remove(); // Example: Remove the recipe from the DOM
      });
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
